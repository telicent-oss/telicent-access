const express = require("express")
const cors = require("cors")
const db = require("./db.json");
const { DateTime } = require("luxon");
const app = express();

const DATE_FORMAT = "yyyy-LL-dd_HH-mm-ss"
const getLatestKey = () => {
    let latest = 0;
    Object.keys(db.backups).forEach(key => {
        if(key > latest){
            latest = key
        }
        
    })
    return Number(latest)+1
}
app.use(cors())
app.get("/api/sparql/backups/list", (req,res) => {
    res.send({date: DateTime.now().toFormat(DATE_FORMAT) , ...db})
})

app.post("/api/sparql/backups/create/:datasetName", (req,res) => {
    const key= getLatestKey()
    const newBackup = createSingleTemplate(key, req.params.datasetName, DateTime.now().toFormat(DATE_FORMAT));
    db.backups[key] = newBackup.backup
    res.send(newBackup)
})

app.post("/api/sparql/backups/create", (req,res) => {
    const key= getLatestKey()
    const newBackup = createFullBackupTempalte(key, DateTime.now().toFormat(DATE_FORMAT));
    db.backups[key] = newBackup.backup
    if(Math.random() > 0.8){
        res.status(404).send()
        return
    }
        res.send(newBackup)
        
    
})

app.post("/api/sparql/backups/delete/:id", (req,res) => {
    if(db.backups[req.params.id]){
        const deletion = deleteObject(`/${req.params.id}`, DateTime.now().toFormat(DATE_FORMAT))
        delete db.backups[req.params.id]
        res.send(deletion)
    } else {
        const deletion = deleteObject(`/${req.params.id}`, DateTime.now().toFormat(DATE_FORMAT))
        deletion.delete.success = false
        deletion.delete.reason = `Backup path unsuitable: /fuseki/backups//${req.params.id}`
        res.send(deletion)
    }
    
})

app.post("/api/sparql/backups/restore/:id", (req,res) => {
    if(db.backups[req.params.id]){
        const restore = restoreObject()
        res.send(restore)
    } else {
        const restore = restoreErr(`/${req.params.id}`, DateTime.now().toFormat(DATE_FORMAT))
        res.send(restore)
    }
})

const deleteObject = (id, date) => (
    {
        "delete-id" : id,
        "date" : date,
        "delete" : {
          "delete-id" : id,
          "date" : date,
          "deletePath" : `/fuseki/backups/${id}`,
          "success" : true
        }
      }
)
const restoreErr = (id, date) => (
    {
        "id" : id,
        "date" : date,
        "user" : "jeff.tester@demo.com",
        "restore" : {
          
          "reason": `Restore path unsuitable: /fuseki/backups/${id}`,
          "restorePath" : `/fuseki/backups/${id}`,
          "success" : false
        }
      }
)
const createSingleTemplate = (key, dataset, date) => (
    {
        "id" : `/${dataset}`,
        "date" : date,
        "user" : "jeff.tester@demo.co.uk",
        "backup" : {
          "backup-id" : key,
          "date" : date,
          "datasets" : [ {
            "dataset-id" : `${dataset}`,
            "tdb" : {
              "folder" : `/fuseki/backups/${key}/${dataset}/tdb/`,
              "success" : true,
              "files" : {
                "files" : [ `${dataset}_backup.nq.gz` ]
              }
            },
            "kafka" : {
              "folder" : `/fuseki/backups/${key}/${dataset}/kafka/`,
              [`/${dataset}`] : [ {
                "name" : `${dataset}`,
                "source" : `/fuseki/databases/Replay-${dataset}-RDF.state`,
                "destination" : `/fuseki/backups/${key}/${dataset}/kafka/${dataset}.json`,
                "success" : true
              } ],
              "files" : {
                "files" : [ `${dataset}.json` ]
              }
            },
            "labels" : {
              "folder" : `/fuseki/backups/${key}/${dataset}/labels/`,
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "private" : {
                  "1" : {
                    "files" : [ "OPTIONS-000012", "MANIFEST-000010", "000009.log", "CURRENT" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000008_s6L1QU9I29RZSDZ2TN8SF_2992501.sst" ]
                }
              }
            }
          } ]
        }
      }
)
const createFullBackupTempalte = (key, date) =>(
    {
        "id" : "/",
        "date" : date,
        "user" : "jeff.tester@demo.com",
        "description" : "Weekly Full Backup by Jeff",
        "backup" : {
          "backup-id" : key,
          "date" : date,
          "datasets" : [ {
            "dataset-id" : "knowledge",
            "tdb" : {
              "folder" : `/fuseki/backups/${key}/knowledge/tdb/`,
              "success" : true,
              "files" : {
                "files" : [ "knowledge_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : `/fuseki/backups/${key}/knowledge/kafka/`,
              "/knowledge" : [ {
                "name" : "knowledge",
                "source" : "/fuseki/databases/Replay-RDF.state",
                "destination" : `/fuseki/backups/${key}/knowledge/kafka//knowledge.json`,
                "success" : true
              } ],
              "files" : {
                "files" : [ "knowledge.json" ]
              }
            },
            "labels" : {
              "folder" : `/fuseki/backups/${key}/knowledge/labels/`,
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "private" : {
                  "1" : {
                    "files" : [ "000131.log", "CURRENT", "OPTIONS-000134", "MANIFEST-000132" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000137_s6L1QU9I29RZSDZ2TN8SE_68784860.sst", "000141_s6L1QU9I29RZSDZ2TN8SE_69309010.sst", "000139_s6L1QU9I29RZSDZ2TN8SE_68705831.sst", "000138_s6L1QU9I29RZSDZ2TN8SE_68719566.sst", "000140_s6L1QU9I29RZSDZ2TN8SE_68410333.sst", "000142_s6L1QU9I29RZSDZ2TN8SE_69410348.sst", "000143_s6L1QU9I29RZSDZ2TN8SE_10773991.sst" ]
                }
              }
            }
          }, {
            "dataset-id" : "catalog",
            "tdb" : {
              "folder" : `/fuseki/backups/${key}/catalog/tdb/`,
              "success" : true,
              "files" : {
                "files" : [ "catalog_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : `/fuseki/backups/${key}/catalog/kafka/`,
              "/catalog" : [ {
                "name" : "catalog",
                "source" : "/fuseki/databases/Replay-Catalog-RDF.state",
                "destination" : `/fuseki/backups/${key}/catalog/kafka//catalog.json`,
                "success" : true
              } ],
              "files" : {
                "files" : [ "catalog.json" ]
              }
            },
            "labels" : {
              "folder" : `/fuseki/backups/${key}/catalog/labels/`,
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "private" : {
                  "1" : {
                    "files" : [ "OPTIONS-000012", "MANIFEST-000010", "000009.log", "CURRENT" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000008_s6L1QU9I29RZSDZ2TN8SC_38233.sst" ]
                }
              }
            }
          }, {
            "dataset-id" : "ontology",
            "tdb" : {
              "folder" : `/fuseki/backups/${key}/ontology/tdb/`,
              "success" : true,
              "files" : {
                "files" : [ "ontology_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : `/fuseki/backups/${key}/ontology/kafka/`,
              "/ontology" : [ {
                "name" : "ontology",
                "source" : "/fuseki/databases/Replay-Ontology-RDF.state",
                "destination" : `/fuseki/backups/${key}/ontology/kafka//ontology.json`,
                "success" : true
              } ],
              "files" : {
                "files" : [ "ontology.json" ]
              }
            },
            "labels" : {
              "folder" : `/fuseki/backups/${key}/ontology/labels/`,
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "private" : {
                  "1" : {
                    "files" : [ "OPTIONS-000012", "MANIFEST-000010", "000009.log", "CURRENT" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000008_s6L1QU9I29RZSDZ2TN8SF_2992501.sst" ]
                }
              }
            }
          } ]
        }
      }
)
const restoreObject = () => (
    {
        "id" : "/2",
        "date" : new Date().toISOString(),
        "user" : "jeff.tester@demo.com",
        "restore" : {
          "restorePath" : "/fuseki/backups//2",
          "catalog" : {
            "dataset-id" : "catalog",
            "tdb" : {
              "folder" : "/fuseki/backups//2/catalog/tdb/",
              "restorePath" : "/fuseki/backups//2/catalog/tdb//catalog_backup.nq.gz",
              "success" : true,
              "files" : {
                "files" : [ "catalog_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : "/fuseki/backups//2/catalog/kafka/",
              "/catalog" : [ {
                "name" : "catalog",
                "offset" : 1402,
                "success" : true
              } ],
              "files" : {
                "files" : [ "catalog.json" ]
              }
            },
            "labels" : {
              "folder" : "/fuseki/backups//2/catalog/labels/",
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "files" : [ "000008.log" ],
                "private" : {
                  "1" : {
                    "files" : [ "CURRENT", "MANIFEST-000009", "OPTIONS-000011", "000008.log" ]
                  }
                },
                "shared_checksum" : { }
              }
            }
          },
          "ontology" : {
            "dataset-id" : "ontology",
            "tdb" : {
              "folder" : "/fuseki/backups//2/ontology/tdb/",
              "restorePath" : "/fuseki/backups//2/ontology/tdb//ontology_backup.nq.gz",
              "success" : true,
              "files" : {
                "files" : [ "ontology_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : "/fuseki/backups//2/ontology/kafka/",
              "/ontology" : [ {
                "name" : "ontology",
                "offset" : 50964,
                "success" : true
              } ],
              "files" : {
                "files" : [ "ontology.json" ]
              }
            },
            "labels" : {
              "folder" : "/fuseki/backups//2/ontology/labels/",
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "files" : [ "000009.log" ],
                "private" : {
                  "1" : {
                    "files" : [ "OPTIONS-000012", "MANIFEST-000010", "000009.log", "CURRENT" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000008_sE2GWJWZWS8JYXZHENHN6_2992049.sst" ]
                }
              }
            }
          },
          "knowledge" : {
            "dataset-id" : "knowledge",
            "tdb" : {
              "folder" : "/fuseki/backups//2/knowledge/tdb/",
              "restorePath" : "/fuseki/backups//2/knowledge/tdb//knowledge_backup.nq.gz",
              "success" : true,
              "files" : {
                "files" : [ "knowledge_backup.nq.gz" ]
              }
            },
            "kafka" : {
              "folder" : "/fuseki/backups//2/knowledge/kafka/",
              "/knowledge" : [ {
                "name" : "knowledge",
                "offset" : 311757,
                "success" : true
              } ],
              "files" : {
                "files" : [ "knowledge.json" ]
              }
            },
            "labels" : {
              "folder" : "/fuseki/backups//2/knowledge/labels/",
              "success" : true,
              "files" : {
                "meta" : {
                  "files" : [ "1" ]
                },
                "files" : [ "000072.log" ],
                "private" : {
                  "1" : {
                    "files" : [ "MANIFEST-000073", "CURRENT", "OPTIONS-000075", "000072.log" ]
                  }
                },
                "shared_checksum" : {
                  "files" : [ "000077_sE2GWJWZWS8JYXZHENHN7_68785994.sst", "000076_sE2GWJWZWS8JYXZHENHN7_68808191.sst", "000080_sE2GWJWZWS8JYXZHENHN7_11082531.sst", "000078_sE2GWJWZWS8JYXZHENHN7_68473975.sst", "000079_sE2GWJWZWS8JYXZHENHN7_69444784.sst" ]
                }
              }
            }
          }
        }
      }
)

app.get("/", (req, res) => 
res.send("Hello!"))
app.listen(3002, () => {
   
    console.log("Server started")
})