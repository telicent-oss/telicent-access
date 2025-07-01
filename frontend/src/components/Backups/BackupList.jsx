import { TeliChip, TeliSpinner } from "@telicent-oss/ds";
import React from "react"
import { confirmAlert } from "react-confirm-alert";
import Panel from "../../lib/Panel";

const BackupList = ({ loading, setError, backups, getBackups, deleteSingleBackup, restoreSingleBackup }) => {

  const mostRecentID = backups.reduce((acc, curr) => {
    if (!acc.date || curr.date > acc.date) {
      return curr
    }
    return acc
  }, {})?.id



  const onDeleteHandler = (id) => async () => {
    confirmAlert({
      title: "Delete Backup?",
      message: "This permanently removes the backup.",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {

            // eslint-disable-next-line no-unused-vars
            const [_, err] = await deleteSingleBackup(id)
            if (err) {
              setError(err)
              return
            }
            await getBackups();




          },
        },
        {
          label: "Don't Delete",
        },
      ],
    });
  }



  const onRestoreHandler = (id) => async () => {
    confirmAlert({
      title: `Restore Backup ${id}?`,
      message: "This will cause a temporary outage as we restore to this artefact.",
      buttons: [
        {
          label: "Restore",
          onClick: async () => {

            // eslint-disable-next-line no-unused-vars
            const [_, err] = await restoreSingleBackup(id)
            if (err) {
              setError(err)
            }

          },
        },
        {
          label: "Don't Restore",
        },
      ],
    });
  }
  if (loading) {
    return (
      <div className="mx-12 flex items-center">
        <TeliSpinner size={64} className="flex" /><p className='ml-4'>{loading.message}</p>
      </div>)
  }
  if (backups.length === 0) {
    return (
      <div className="mx-12 flex items-center">
        <p>No backups available</p>
      </div>)
  }
  return (
    <ul className="mx-12">

      {backups.map(backup => (

        <Panel ariaLabel="tile-group" key={backup.id} additionalClassName="!bg-black-100">

          <div className="flex w-full">
            <div className="flex flex-none items-center w-10">
              <div
                className="flex w-10 h-10"

              >
                <i className="self-center w-4 fa-solid fa-folder" />
              </div>
            </div>
            <div className="flex flex-[35%] items-center min-w-0">
              <div className="">
                <div
                  aria-label="text-name"
                  className="truncate font-bold"
                  title={`Backup: ${backup.id}`}
                >
                  Backup: {backup.id}
                </div>
                <div
                  aria-label="text-id"
                  className="truncate text-sm"
                  title={`Date Taken: ${backup.dateTaken}`}
                >
                  {backup.dateTaken}
                </div>
              </div>

              {backup.datasets.map(dataset => <TeliChip
                size="small"
                className="max-w-[150px] ml-6 "
                title={dataset}
                label={dataset}
              />)}
              {mostRecentID === backup.id ?
                <TeliChip
                  size="small"
                  className="max-w-[150px] ml-6 !bg-appColor-hex"
                  title="Most recent backup"
                  label="most recent"
                /> : null}
            </div>

            <div className="flex flex-end items-center">
              <BackupActionButton
                onHandler={onRestoreHandler(backup.id)}
                title="Restore backup"
                label="Restore "
                icon="fa-arrow-up-from-bracket"
                additionalClassName="hover:bg-green-500 pl-1 mr-4"

              />

              <BackupActionButton
                onHandler={onDeleteHandler(backup.id)}
                title="Delete backup"
                icon="fa-trash"
                additionalClassName="hover:bg-red-500  mr-4"

              />

            </div>
          </div>
        </Panel>

      ))
      }
    </ul >
  )
}

const BackupActionButton = ({ onHandler, title, label, icon, additionalClassName }) => {

  const onActionHandler = async () => {


    await onHandler()


  }

  return (
    <button
      type="button"
      aria-label={title}
      title={title}
      className={`flex h-6 rounded ${additionalClassName}
        hover:text-black-100`}
      onClick={onActionHandler}
    >
      {label} <i className={` self-center w-6 fa-solid ${icon}`} />
    </button>
  )
}
export default BackupList;
