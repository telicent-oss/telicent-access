import { useState } from "react";
import { backupAPI } from "../api";

// To check tomorrow -> what is the plan re: API, are failures delivered as a 200?
const useBackupAPI = (url, identifier) => {
  const api = backupAPI[identifier];
  const [loading, setLoading] = useState(false);

  const listBackups = async () => {
    try {
      setLoading({ message: "Fetching a list of backups" });
      const data = await api.getList(url);
      return [data, null];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      return [[], "Failed to retrieve backups"];
    } finally {
      setLoading(null);
    }
  };

  const deleteSingleBackup = async (id) => {
    try {
      setLoading({ message: `Deleting backup: ${id}` });
      const data = await api.delete(url, id);
      return [data, null];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      return [null, `Failed to delete backup: ${id}`];
    } finally {
      setLoading(null);
    }
  };

  const createBackup = async () => {
    try {
      setLoading({ message: "Creating new backup" });
      const data = await api.create(url);
      return [data, null];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      return [null, "Failed to create backup"];
    } finally {
      setLoading(null);
    }
  };
  const restoreSingleBackup = async (id) => {
    try {
      setLoading({ message: `Restoring backup: ${id}` });
      const data = await api.restore(url, id);
      return [data, null];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
      return [null, `Failed to restore backup: ${id}`];
    } finally {
      setLoading(null);
    }
  };

  return {
    loading,
    listBackups,
    deleteSingleBackup,
    restoreSingleBackup,
    createBackup,
  };
};

export default useBackupAPI;
