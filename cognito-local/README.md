# Local AWS Cognito Emulator

This is a local AWS Cognito emulator to be used in conjunction with
[Telicent ACCESS](../README.md). 

## Prerequisites

- AWS CLI 

## Create a User Pool 

`aws --endpoint http://0.0.0.0:9229 cognito-idp create-user-pool --pool-name TestUserPool`

This will provide the `AUTH_USER_POOL_ID` for ACCESS.

> Cognito local does not currently work with single sign-on (SSO). In order for
> it to function, the following IAM variables need to be set:
>
> `export AWS_ACCESS_KEY_ID={key-goes-here}`
>
> `export AWS_SECRET_ACCESS_KEY={secret-key-goes-here}`
>
> `export AWS_DEFAULT_REGION=eu-west-2`

Most AWS CLI commands for Cognito work, including: 

```bash
create-user-pool-client # Create a user pool client
initiate-auth  # Run a user login
admin-set-user-password # Reset a user password
```
