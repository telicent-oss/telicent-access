import { screen } from "@testing-library/react"
import { act } from "react";
import CreateBackup from "../CreateBackup"
import { renderWithUser } from "../../../testUtils"

describe("CreateBackup", () => {
  it("should render", () => {
    const { user } = renderWithUser(<CreateBackup onCreate={jest.fn()} loading={false} getBackups={jest.fn()} setError={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("should call on create and a getBackups when button clicked", async () => {
    const onCreateMock = jest.fn().mockResolvedValue(["unused", null]);
    const getBackupsMock = jest.fn();
    const setErrorMock = jest.fn();

    const { user } = renderWithUser(<CreateBackup onCreate={onCreateMock} loading={false} getBackups={getBackupsMock} setError={setErrorMock} />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Create" }))
    });

    expect(onCreateMock).toHaveBeenCalled();
    expect(getBackupsMock).toHaveBeenCalled();
    expect(setErrorMock).not.toHaveBeenCalled();

  });

  it("should call on create and setError when the button clicked and an error is returned", async () => {
    const onCreateMock = jest.fn().mockResolvedValue(["unused", "something happened"]);
    const getBackupsMock = jest.fn();
    const setErrorMock = jest.fn();

    const { user } = renderWithUser(<CreateBackup onCreate={onCreateMock} loading={false} getBackups={getBackupsMock} setError={setErrorMock} />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Create" }))
    });

    expect(onCreateMock).toHaveBeenCalled();
    expect(getBackupsMock).not.toHaveBeenCalled();
    expect(setErrorMock).toHaveBeenCalledWith("something happened");

  });
})
