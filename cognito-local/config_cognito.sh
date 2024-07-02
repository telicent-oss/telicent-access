aws --endpoint http://0.0.0.0:9229 cognito-idp admin-create-user --user-pool-id local_6GLuhxhD --username test+admin@telicent.io --cli-read-timeout 0 --message-action SUPPRESS --user-attributes Name=email,Value=test+admin@telicent.io 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-create-user --user-pool-id local_6GLuhxhD --username test+user@telicent.io --cli-read-timeout 0 --message-action SUPPRESS --user-attributes Name=email,Value=test+user@telicent.io 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-create-user --user-pool-id local_6GLuhxhD --username test+user+admin@telicent.io --cli-read-timeout 0 --message-action SUPPRESS --user-attributes Name=email,Value=test+user+admin@telicent.io 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-create-user --user-pool-id local_6GLuhxhD --username test@telicent.io --cli-read-timeout 0 --message-action SUPPRESS --user-attributes Name=email,Value=test@telicent.io 1> /dev/null

echo "4 users created"

aws --endpoint http://0.0.0.0:9229 cognito-idp admin-set-user-password --user-pool-id local_6GLuhxhD --username test+admin@telicent.io --password password --permanent 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-set-user-password --user-pool-id local_6GLuhxhD --username test+user+admin@telicent.io --password password --permanent  1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-set-user-password --user-pool-id local_6GLuhxhD --username test+user@telicent.io --password password --permanent 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-set-user-password --user-pool-id local_6GLuhxhD --username test@telicent.io --password password --permanent 1> /dev/null

echo "all users passwords set to ... password"

aws --endpoint http://0.0.0.0:9229 cognito-idp create-group --user-pool-id local_6GLuhxhD  --group-name tc_admin 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp create-group --user-pool-id local_6GLuhxhD  --group-name tc_read 1> /dev/null

echo "tc_admin and tc_read groups created"

aws --endpoint http://0.0.0.0:9229 cognito-idp admin-add-user-to-group --user-pool-id local_6GLuhxhD --username test+admin@telicent.io --group-name tc_admin 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-add-user-to-group --user-pool-id local_6GLuhxhD --username test+user@telicent.io --group-name tc_read 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-add-user-to-group --user-pool-id local_6GLuhxhD --username test+user+admin@telicent.io --group-name tc_admin 1> /dev/null
aws --endpoint http://0.0.0.0:9229 cognito-idp admin-add-user-to-group --user-pool-id local_6GLuhxhD --username test+user+admin@telicent.io --group-name tc_read 1> /dev/null

echo "Added users to groups when required"