/* eslint-disable import/first */
jest.mock("../hooks/useBackupAPI.jsx", () => { });
import React, { act } from "react"
import { render, screen } from "@testing-library/react"
import { BackupError } from "../BackupContainer"

jest.useFakeTimers()

describe("BackupError", () => {
  const error = { id: "err1", message: "Something went wrong" }

  it("renders nothing if no errors", () => {
    const { container } = render(
      <BackupError errors={[]} dismissError={jest.fn()} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it("renders an error message", () => {
    render(
      <BackupError errors={[error]} dismissError={jest.fn()} />
    )
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
    expect(screen.getByText("5s")).toBeInTheDocument()
  })

  it("counts down and calls dismissError after 5s", () => {
    const dismissError = jest.fn()

    render(<BackupError errors={[error]} dismissError={dismissError} />)

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    expect(dismissError).toHaveBeenCalledWith("err1")
  })

  it("updates the countdown display each second", () => {
    render(<BackupError errors={[error]} dismissError={jest.fn()} />)

    expect(screen.getByText("5s")).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByText("4s")).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(2000)
    })
    expect(screen.getByText("2s")).toBeInTheDocument()
  })
})

