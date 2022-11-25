# Re Generates the client library in the frontend project
java -jar ./swagger-codegen-cli.jar generate -i ./public/api.yaml -l typescript-angular -o ../Frontend/src/swagger --additional-properties ngVersion=15.0,providedInRoot=true,supportsES6=true,modelPropertyNaming=original
cd ../Frontend
./sanitize-swagger.sh