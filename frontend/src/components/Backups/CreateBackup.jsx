import { TeliButton, TeliSpinner } from '@telicent-oss/ds';
import React, { useState } from 'react'

const CreateBackup = ({ onCreate, getBackups, setError }) => {
    const [loading, setLoading] = useState(false);

    const onCreateHandler = async () => {
        setError("Failed to handle create")
        setLoading(true)
        const [_, err] = await onCreate();
        if (err) {
            setError(err)
            return
        }
        await getBackups();

        setLoading(false)


    }
    return (
        <TeliButton id="create-backup" disabled={loading} variant="secondary" onClick={onCreateHandler} size="small" className=' h-[34.5px]'>
            {loading ? <TeliSpinner size="12px" /> : "Create"}
        </TeliButton>
    )
}

export default CreateBackup;