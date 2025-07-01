/* eslint-disable import/first */
jest.mock("../hooks/useBackupAPI.jsx", () => ({
  __esModule: true,
  default: jest.fn()
}));

import { render } from "@testing-library/react"
import { act } from "react";
import useBackupAPI from "../hooks/useBackupAPI";

import SCBackup from "../SCBackup"

describe("SCBackup", () => {

  beforeEach(() => {
    useBackupAPI.mockReturnValue({
      loading: false,
      listBackups: jest.fn().mockResolvedValue([[], null]),
      deleteSingleBackup: jest.fn(),
      restoreSingleBackup: jest.fn(),
      createBackup: jest.fn()
    })

  })
  it("should render", async () => {

    let got;
    await act(async () => {
      const { container } = render(<SCBackup name="Smart Cache Graph" identifier="scg" type="triplestore" url="http://test/url" />);

      got = container;
    })

    expect(got).toMatchSnapshot();
  })

  it("should not render", () => {
    const { container } = render(<SCBackup name="Smart Cache Graph" identifier="scg" type="triplestore" />);

    expect(container).toBeEmptyDOMElement();
  })


})
