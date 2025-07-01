# Telicent ACCESS Front End

The front end to ACCESS is a React application, which serves as an admin UI for configuring user permissions for CORE. 

## Environment Variables

It can be configured using these variables

| Env var             | type    | description                                                                                                 | default                         |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------|
| ACCESS_API_URL      | url     | Endpoint where ACCESS API is being served from                                                              | http://localhost:8091           |
| BETA                | boolean | Beta flag for UI - deprecated                                                                               | false                           |
| FF_BACKUPS_DEMO     | boolean | Temporary flag for Backups feature.                                                                         | false                           |
| SIGN_OUT_URL        | url     | Url to sign out page                                                                                        | undefined                       |
| SCG_URL             | url     | Url to Smart Cache Graph API                                                                                | http://localhost:3002/api/sparql|

The environment variables can be overriden in the env-config.js in the public directory.  This can be beneficial in Docker and K8s deployments. 

An example override file has been provided override-env-config.js

## Docker run ride 

docker run -p 8080:8080 --user=1000  --mount type=bind,source=./override-env-config.js,target=/usr/share/nginx/html/access/env-config.js telicent-access

This overrides the env-config.js with the override config file. 
