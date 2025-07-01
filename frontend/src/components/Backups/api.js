import axios from "axios";
import { DateTime } from "luxon";
import config from "../../config/app-config";

// Need to create version of this for SCS

// Date example: 2025-06-24_13-57-46
const DATE_FORMAT = "yyyy-LL-dd_HH-mm-ss"
const PRESENTATION_FORMAT = "dd LLLL yyyy - HH:mm:ss"
export const compare = (a,b) => {
    if(a.date < b.date){
        return 1;
    } 
    if(a.date > b.date){
        return -1;
    }
        return 0;
    
}
const getSCGBackups = async (baseurl) => {
    const resp = await axios.get(`${baseurl}/backups/list`);
    const results = Object.values(resp.data.backups).map(backup => {
        const dt = DateTime.fromFormat(backup.date, DATE_FORMAT)
        
       return {
        id: backup["backup-id"],
        dateTaken: dt.toFormat(PRESENTATION_FORMAT),
        date: dt.toMillis(),
        datasets: backup.datasets.reduce((acc, curr) => {
            acc.push(curr["dataset-id"])
            return acc
        }, [])
    }})
    return results.sort(compare)
}



const deleteSCGBackup = async (baseurl, id) => {
    const resp = await axios.post(`${baseurl}/backups/delete/${id}`);
    return resp
}

const restoreSCGBackup = async (baseurl, id) => {
    const resp = await axios.post(`${baseurl}/backups/restore/${id}`);
    return resp
}

const createSCGBackup = async (baseurl) => {
    const resp = await axios.post(`${baseurl}/backups/create`);
    return resp
}

const getSCSBackups = async (baseurl) => {
    try{
        const resp = await axios.get(`${baseurl}/backups/list/${config.search.backupRepo}`);
        const results = resp.data.snapshots.filter(snapshot => snapshot.state === "SUCCESS").map(snapshot => {
            const dt = DateTime.fromISO(snapshot.endTime)
            return {
                id: snapshot.name,
                dateTaken: dt.toFormat(PRESENTATION_FORMAT),
                date: dt.toMillis(),
                datasets: [snapshot.indices]
            }
        })
        return results.sort(compare)
    } catch(error) {
        if(error.status === 400){
            return []
        }
        throw error   
    }   
}



const deleteSCSBackup = async (baseurl, id) => {
    const resp = await axios.post(`${baseurl}/backups/delete/${id}`);
    return resp
}

const restoreSCSBackup = async (baseurl, id) => {
    const resp = await axios.post(`${baseurl}/backups/restore/${id}`);
    return resp
}
const SCS_INDEXES = ["search", "doc-content"]
const createSCSBackup = async (baseurl) => {
    const resps = await Promise.all(SCS_INDEXES.map(index => axios.post(`${baseurl}/backups/create/${config.search.backupRepo}`, {
        indexName: index
    })))
    return resps.map(resp => resp.data)
   
}
const scgBackupAPI = {
    getList: getSCGBackups,
    restore: restoreSCGBackup,
    delete: deleteSCGBackup,
    create: createSCGBackup
}


// const scsBackupAPI = {
//     getList: getSCSBackups,
//     restore: ()=>{},
//     delete: ()=>{},
//     create: createSCSBackup
// }

export const backupAPI = {
    "scg": scgBackupAPI,
    // "scs": scsBackupAPI
}