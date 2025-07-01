/* eslint-disable import/first */
jest.mock("../../api", () => ({
  backupAPI: {
    scg: {
      getList: jest.fn(),
      restore: jest.fn(),
      delete: jest.fn(),
      create: jest.fn()
    }
  }
}))

import { renderHook, waitFor } from "@testing-library/react"
import { act } from "react";
import useBackupAPI from "../useBackupAPI";
import { backupAPI } from "../../api"

describe("useBackupAPI", () => {
  describe("list backups", () => {
    it("should call the underlying scg getlist function", async () => {
      // NOTE: second argument to hook is the service identifier
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      await act(async () => {
        await result.current.listBackups()
      })

      await waitFor(() => result.current.loading === false);

      expect(backupAPI.scg.getList).toHaveBeenCalledWith("http://test/url")
    });

    it("should return a valid tuple with error if the undelying api throws", async () => {
      jest.spyOn(backupAPI.scg, "getList").mockRejectedValue({ message: "call failed" });
      // NOTE: second argument to hook is the service identifier
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      let listResult;
      await act(async () => {
        listResult = await result.current.listBackups()
      })

      await waitFor(() => result.current.loading === false);

      expect(backupAPI.scg.getList).toHaveBeenCalledWith("http://test/url")
      expect(listResult).toEqual([[], "Failed to retrieve backups"])
    });
  });

  describe("delete backups", () => {
    it("should call the underlying scg delete function", async () => {
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      await act(async () => {
        await result.current.deleteSingleBackup("test-id");
      });

      await waitFor(() => result.current.loading === false);

      const want = ["http://test/url", "test-id"];
      expect(backupAPI.scg.delete).toHaveBeenCalledWith(...want);
    });

    it("should return a valid tuple with error if the undelying api throws", async () => {
      jest.spyOn(backupAPI.scg, "delete").mockRejectedValue({ message: "call failed" });
      // NOTE: second argument to hook is the service identifier
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      let listResult;
      await act(async () => {
        listResult = await result.current.deleteSingleBackup("test-id");
      })

      await waitFor(() => result.current.loading === false);

      const want = ["http://test/url", "test-id"];
      expect(backupAPI.scg.delete).toHaveBeenCalledWith(...want)
      expect(listResult).toEqual([null, "Failed to delete backup: test-id"]);
    });
  })

  describe("restore backup", () => {
    it("should call the underlying scg restore function", async () => {
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      await act(async () => {
        await result.current.restoreSingleBackup("test-id");
      });

      await waitFor(() => result.current.loading === false);

      const want = ["http://test/url", "test-id"];
      expect(backupAPI.scg.restore).toHaveBeenCalledWith(...want);
    });

    it("should return a valid tuple with error if the undelying api throws", async () => {
      jest.spyOn(backupAPI.scg, "restore").mockRejectedValue({ message: "call failed" });
      // NOTE: second argument to hook is the service identifier
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      let listResult;
      await act(async () => {
        listResult = await result.current.restoreSingleBackup("test-id");
      })

      await waitFor(() => result.current.loading === false);

      const want = ["http://test/url", "test-id"];
      expect(backupAPI.scg.restore).toHaveBeenCalledWith(...want)
      expect(listResult).toEqual([null, "Failed to restore backup: test-id"]);
    });
  });

  describe("create backups", () => {
    it("should call the underlying scg create function", async () => {
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      await act(async () => {
        await result.current.createBackup("test-id");
      });

      await waitFor(() => result.current.loading === false);

      expect(backupAPI.scg.create).toHaveBeenCalledWith("http://test/url");
    });

    it("should return a valid tuple with error if the undelying api throws", async () => {
      jest.spyOn(backupAPI.scg, "create").mockRejectedValue({ message: "call failed" });
      // NOTE: second argument to hook is the service identifier
      const { result } = renderHook(() => useBackupAPI("http://test/url", "scg"));
      expect(result.current.loading).toBe(false);

      let listResult;
      await act(async () => {
        listResult = await result.current.createBackup("test-id");
      })

      await waitFor(() => result.current.loading === false);

      expect(backupAPI.scg.create).toHaveBeenCalledWith("http://test/url")
      expect(listResult).toEqual([null, "Failed to create backup"]);
    });
  });
});
