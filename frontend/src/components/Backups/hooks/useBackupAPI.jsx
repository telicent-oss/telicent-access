import React, { useState } from 'react'
import { backupAPI } from '../api';

// To check tomorrow -> what is the plan re: API, are failures delivered as a 200? 
const useBackupAPI = (url, identifier) => {
    const api = backupAPI[identifier]
    const [loading, setLoading] = useState(false);

    const listBackups = async () => {
        try {
            setLoading(true)
            const data = await api.getList(url)
            return [data, null]
        } catch (e) {
            console.log(e.message)
            return [[], "Failed to retrieve backups"]
        } finally {
            setLoading(false)
        }
    }

    const deleteSingleBackup = async (id) => {
        try {
            const data = await api.delete(url, id)
            return [data, null]
        } catch (e) {
            console.log(e.message)
            return [null, `Failed to delete backup: ${id}`]
        }
    }

    const createBackup = async () => {
        try {
            const data = await api.create(url)
            return [data, null]
        } catch (e) {
            console.log(e.message);
            return [null, "Failed to create backup"]
        }
    }
    const restoreSingleBackup = async (id) => {
        try {
            const data = await api.restore(url, id)
            return [data, null]
        } catch (e) {
            console.log(e.message)
            return [null, `Failed to restore backup: ${id}`]
        }
    }


    return { loading, listBackups, deleteSingleBackup, restoreSingleBackup, createBackup }
}

export default useBackupAPI