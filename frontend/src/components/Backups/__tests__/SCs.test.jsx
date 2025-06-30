/* eslint-disable import/first */
jest.mock("../hooks/useBackupAPI.jsx", () => ({
  __esModule: true,
  default: jest.fn()
}));

import { render } from "@testing-library/react"
import SCs from "../SCs"
import useBackupAPI from "../hooks/useBackupAPI";

describe("SCs", () => {

  beforeEach(() => {
    useBackupAPI.mockReturnValue({
      loading: false,
      listBackups: jest.fn().mockResolvedValue([[], null]),
      deleteSingleBackup: jest.fn(),
      restoreSingleBackup: jest.fn(),
      createBackup: jest.fn()
    });
  });

  it("should rendenr", () => {
    const { container } = render(<SCs />)
    expect(container).toMatchSnapshot();
  })
})
