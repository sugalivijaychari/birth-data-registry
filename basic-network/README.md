# This is basic hyperledger fabric network with below topology:
* NETWORK
   * Organizations
      * Orderer Organizations
         * Orderers
            * orderer.example.com
         * Users
            * Admin@example.com
      * Peer Organizations
         * Peers
            * peer0.org1.example.com
         * Users
            * Admin@org1.example.com
            * User1@org1.example.com

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
