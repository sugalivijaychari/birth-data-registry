# Nodejs-Expressjs Restful Application to interact with Hyperledger Fabric Chaincode
## Description of project:
* This is a Nodejs application
* It is developed with below dependencies:
    * "express": to expose restful APIs,
    * "fabric-ca-client": to interact with fabric client within nodejs,
    * "fabric-network": to interact with fabric network within nodejs,
    * "fs": to fetch the files like wallets of users, connection profiles etc
    * "path": to parse the whole directory of the files
* It has below components:
    * enrollAdmin.js - We should run this script before creating users
    * registerUser.js - We should run this script before invoking APIs
    * index.js - It has below APIs
    * /api/addBirthData/ - To add birth data of users into Hyperledger Fabric Blockchain
    * /api/queryBirthData - To query the birth data of users fro Hyperledger Fabric Blockchain
    * Wallet - It is a directory consisting of users certificates and private keys
* These APIs will be helpful to UI to interact with Hyperledger Fabric Chaincode and the network.