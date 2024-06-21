# Local AWS Cognito Emulator

This is a local AWS Cognito emulator to be used in conjunction with
[Telicent ACCESS](../README.md). 

## Prerequisites

- AWS CLI 

## Create a User Pool 

A user pool and client has been created: 
UserPoolId: local_6GLuhxhD
ClientId: 6967e8jkb0oqcm9brjkrbcrhj
ClientName: access

## Using cognito 

You can reset the state of cognito by running the script "reset_cognito.sh" 

```
sh reset_cognito.sh
```

Once this is clean you can start up the local cognito instance:

```
docker compose up
```

You can then configure users and groups in Cognito, by using the "config_cognito.sh"

```
sh config_cognito.sh
```

This will configure 4 users:

| user | password | tc_read | tc_admin| command to get token |
|-|-|-|-|-|
| test+admin@telicent.io | password | ❌ | ✅ | `aws --endpoint http://0.0.0.0:9229 cognito-idp initiate-auth --client-id 6967e8jkb0oqcm9brjkrbcrhj --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=test+admin@telicent.io,PASSWORD=password` |
| test+user@telicent.io | password | ✅ | ❌ | `aws --endpoint http://0.0.0.0:9229 cognito-idp initiate-auth --client-id 6967e8jkb0oqcm9brjkrbcrhj --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=test+user@telicent.io,PASSWORD=password` |
| test+user+admin@telicent.io | password | ✅ | ✅ | `aws --endpoint http://0.0.0.0:9229 cognito-idp initiate-auth --client-id 6967e8jkb0oqcm9brjkrbcrhj --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=test+user+admin@telicent.io,PASSWORD=password` |
| test@telicent.io | password | ❌ | ❌ | `aws --endpoint http://0.0.0.0:9229 cognito-idp initiate-auth --client-id 6967e8jkb0oqcm9brjkrbcrhj --auth-flow USER_PASSWORD_AUTH --auth-parameters USERNAME=test@telicent.io,PASSWORD=password` |

This command gets the token which can be used to log in; it will return an Access Token, Refresh Token and ID Token. 

Take the ID Token, and you can call the ACCESS API in the JWT header as a bearer token. By default the JWT header is "authorization".


