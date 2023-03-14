# This is basic hyperledger fabric network with below topology:
NETWORK
|_Organizations
|___Orderer Organizations
|______Orderers
|_________orderer.example.com
|______Users
|_________Admin@example.com
|___Peer Organizations
|______Peers
|_________peer0.org1.example.com
|______Users
|_________Admin@org1.example.com
|_________User1@org1.example.com

## Steps to run the network:
* Make sure docker images are pulled from docker hub.
* Docker images required are:
    * hyperledger/fabric-tools
    * hyperledger/fabric-ccenv
    * hyperledger/fabric-orderer
    * hyperledger/fabric-peer
    * hyperledger/fabric-baseimage
    * hyperledger/fabric-ca
    * hyperledger/fabric-couchdb
* Run the script start.sh
## NOTE: mychannel is created and all actors in the network are joined

## Steps to deploy chaincode:
* docker exec -it cli bash
* peer chaincode install -n mycc -v 1.0 -p "/opt/gopath/src/github.com/birth-registry-chaincode" -l "node"
* peer chaincode instantiate -o orderer.example.com:7050 -C mychannel -n mycc -l "node" -v 1.0 -c '{"Args":[]}'
