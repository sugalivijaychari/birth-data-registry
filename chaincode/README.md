# Chaincode of Birth Registry Implementation

## Description:
* Birth registry chaincode is used to insert birth data of users into Hyperledger Fabric Blockchain.
* Along with inserting birth data, we can query the birth data that we have inserted.
* Also, we can delete the birth data if needed

## Chaincode information:
* Chaincode is written in Nodejs
* Total three functions are developed. They are:
    * queryBirthData
    * addBirthData
    * deleteBirthData
* Information stored in Blockchain via chaincode are:
    * userId - user id of the owner of birth data,
    * userName - name of the owner of birth data,
    * userFatherName - father name of the owner of birth data,
    * userGender - gender of the owner of birth data,
    * userHospitalName - hospital name where owner of birth data has born,
    * userBirthTimestamp - date and time when owner of birth data has born,
    * userBirthPllace - place where owner of birth data has born

## Steps to interact with chaincode from command line:
* docker exec -it cli bash
* Invoke:
    `peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n mycc -c '{"function":"addBirthData","Args":["Alice","Alice Roy","Vin Roy","F","Apollo", "Jan1,1990 8AM", "Mumbai"]}'`
* Query:
    `peer chaincode query -o orderer.example.com:7050 -C mychannel -n mycc -c '{"function":"queryBirthData","Args":["Alice"]}'`
* Delete:
    `peer chaincode invoke -o orderer.example.com:7050 -C mychannel -n mycc -c '{"function":"deleteBirthData","Args":["Alice"]}'`