import { render, screen, waitFor } from "@testing-library/react"
import { act } from "react";
import BackupList from "../BackupList"
import { renderWithUser } from "../../../testUtils";

describe("BackupList", () => {

  it("should show no backups available", () => {
    render(<BackupList backups={[]} loading={false} setError={jest.fn()} deleteSingleBackup={jest.fn()} restoreSingleBackup={jest.fn()} getBackups={jest.fn()} />);

    expect(screen.getByText("No backups available")).toBeInTheDocument();
  });

  it("should show list available backups", () => {
    const sampleBackups = [
      {
        id: "1",
        dateTaken: "2025-06-24_13-57-46",
        datasets: ["catalog"]
      }
    ]

    const { container } = render(<BackupList backups={sampleBackups} loading={false} setError={jest.fn()} deleteSingleBackup={jest.fn()} restoreSingleBackup={jest.fn()} getBackups={jest.fn()} />);

    expect(container).toMatchSnapshot()
  });

  // TODO: Find a way to click the confirmation button from the react-confirm-alert library
  it.skip("should pass backup id to restore fn", async () => {
    const sampleBackups = [
      {
        id: "1",
        dateTaken: "2025-06-24_13-57-46",
        datasets: ["catalog"]
      }
    ]

    const restoreFnMock = jest.fn();
    const { user, container } = renderWithUser(<BackupList backups={sampleBackups} loading={false} setError={jest.fn()} deleteSingleBackup={jest.fn()} restoreSingleBackup={restoreFnMock} getBackups={jest.fn()} />);

    const restoreButton = container.querySelector("button[title=\"Restore Backup\"]")
    await user.click(restoreButton);

    const confirmRestoreButton = await screen.findByText("This will cause a");

    await act(async () => {
      await user.click(confirmRestoreButton);
    })

    expect(restoreFnMock).toHaveBeenCalledWith("1");
  });

});
