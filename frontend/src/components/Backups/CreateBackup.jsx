import { TeliButton } from "@telicent-oss/ds";
import React from "react"

const CreateBackup = ({ onCreate, loading, getBackups, setError }) => {
  const onCreateHandler = async () => {

    // eslint-disable-next-line no-unused-vars
    const [_, err] = await onCreate();
    if (err) {
      setError(err)
      return
    }
    await getBackups();
  }
  return (
    <TeliButton id="create-backup" variant="secondary" onClick={onCreateHandler} size="small" className={`${!loading ?? "invisible"} h-[34.5px]`}>
      Create
    </TeliButton>
  )
}

export default CreateBackup;
