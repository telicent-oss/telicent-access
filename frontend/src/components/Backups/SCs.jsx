import React from "react"
import config from "../../config/app-config"
import SCBackup from "./SCBackup"

const smartCaches = [
  {
    name: "Smart Cache Graph",
    identifier: "scg",
    url: config.sparql.url,
    type: "triplestore"
  }
];

const SCs = () => (
  <ul className='px-10 m-4'>
    {smartCaches.map(sc => <SCBackup key={sc.identifier} name={sc.name} identifier={sc.identifier} url={sc.url} type={sc.type} />)}
  </ul>
)
export default SCs;
