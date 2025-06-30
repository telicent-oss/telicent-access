import React from 'react'
import BackupContainer from './BackupContainer';
import BackupHeader from './BackupHeader';


const SCBackup = ({ name, identifier, type, url }) => {
    if (!url) {
        return null
    }
    return (
        <BackupContainer url={url} identifier={identifier}>
            <BackupHeader name={name} type={type} />

        </BackupContainer>

    )
}

export default SCBackup;