import React, { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import BackupList from "./BackupList"
import CreateBackup from "./CreateBackup"
import useBackupAPI from "./hooks/useBackupAPI";

const BackupContainer = ({ url, identifier, children }) => {
  const { loading, listBackups, deleteSingleBackup, restoreSingleBackup, createBackup } = useBackupAPI(url, identifier);

  const [backups, setBackups] = useState([]);
  const [errors, setError] = useState([]);

  const addError = (error) => {
    const errObj = {
      id: uuidv4(),
      message: error
    }
    setError(prev => [...prev, errObj])
  }

  const dismissError = (id) => {
    setError(prev => prev.filter(err => err.id !== id))
  }

  const getBackups = useCallback(async () => {
    const [data, err] = await listBackups(url);
    if (err) {
      addError(err)
      return
    }
    setBackups(data)
  }, [listBackups, url])

  useEffect(() => {
    getBackups();
  }, [getBackups]);
  return (
    <div className="p-4 bg-black-200 rounded-lg mb-8 ">
      <div className="flex justify-between mb-4 w-full">


        {children}
        <div className="flex mr-4"> <CreateBackup onCreate={createBackup} getBackups={getBackups} setError={addError} loading={loading} /></div>
      </div>
      <BackupError errors={errors} dismissError={dismissError} />
      <BackupList loading={loading} setError={addError} backups={backups} getBackups={getBackups} deleteSingleBackup={deleteSingleBackup} restoreSingleBackup={restoreSingleBackup} />
    </div>
  )
}
const COUNTDOWN = 5000;
export const BackupError = ({ errors, dismissError }) => {

  if (errors.length === 0) {
    return null
  }
  const errorTimeout = (error) => {
    setTimeout(() => {
      dismissError(error.id);
    }, COUNTDOWN);
  };
  return (<>
    {errors.map(error => {
      errorTimeout(error);
      return (
        <CountdownBackupError key={error.id} error={error.message} />

      )
    })}
  </>)
}
const INTERVAL = 1000;
const CountdownBackupError = ({ error }) => {
  const [timeRemaining, setTimeRemaining] = useState(COUNTDOWN);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => {

        const remainingTime = prev - INTERVAL;
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
        }
        return remainingTime
      });
    }, INTERVAL);

    return () => clearInterval(countdownInterval);

  }, [error, timeRemaining]);

  return (<div className="relative block max-w-[100%] text-base bg-errorMain mb-4 mx-12 px-4 py-4 rounded-md flex justify-between items-center">
    <div>
      <i className="fa-solid fa-circle-exclamation mr-4" />
      {error}
    </div>
    <p>{timeRemaining / 1000}s</p>
  </div>)
}
export default BackupContainer;
