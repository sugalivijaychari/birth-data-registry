var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Setting for Hyperledger Fabric
const { Wallets, FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'basic-network', 'connection.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
ccp.peers['peer0.org1.example.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(ccp.peers['peer0.org1.example.com'].tlsCACerts.path), 'utf8');
ccp.certificateAuthorities['ca.example.com'].tlsCACerts.pem = fs.readFileSync(path.resolve(ccp.certificateAuthorities['ca.example.com'].tlsCACerts.path), 'utf8');

app.post('/api/queryBirthData', async function (req, res) {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get('appUser2');
        if (!userExists) {
            console.log('An identity for the user "appUser2" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
	await gateway.connect(ccp, { wallet, identity: 'appUser2', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('mycc2');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryBirthData', req.body.userId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: `${result.toString()}`});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

app.post('/api/addBirthData/', async function (req, res) {
    try {
        console.log(req)
        // Create a new file system based wallet for managing identities.
        const walletPath = path.resolve(__dirname, '.', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.get('appUser2');
        if (!userExists) {
            console.log('An identity for the user "appUser2" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser2', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('mycc2');

        // Submit the specified transaction.
        await contract.submitTransaction(
          'addBirthData', 
          req.body.userId,
          req.body.userName,
          req.body.userFatherName,
          req.body.userGender,
          req.body.userHospitalName,
          req.body.userBirthTimestamp,
          req.body.userBirthPllace
        );
        console.log('Transaction has been submitted');
        res.status(200).json({response: "Transaction has been submitted"});
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})

app.listen(8080, 'localhost');
console.log('Running on http://localhost:8080');