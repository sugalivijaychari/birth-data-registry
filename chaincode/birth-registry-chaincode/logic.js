'use strict';
const { Contract} = require('fabric-contract-api');

class testContract extends Contract {


  async queryBirthData(ctx,userId) {
    let userDataAsBytes = await ctx.stub.getState(userId); 
    if (!userDataAsBytes || userDataAsBytes.toString().length <= 0) {
        throw new Error('User birth data with this Id does not exist: ');
    }
    let data=JSON.parse(userDataAsBytes.toString());
    return JSON.stringify(data);
  }

  async addBirthData(
    ctx,
    userId,
    userName,
    userFatherName,
    userGender,
    userHospitalName,
    userBirthTimestamp,
    userBirthPllace
  ) {
      let data={
          name:userName,
          fatherName:userFatherName,
          gender:userGender,
          hospitalName:userHospitalName,
          timestamp:userBirthTimestamp,
          place:userBirthPllace
      };
      await ctx.stub.putState(userId,Buffer.from(JSON.stringify(data))); 
      console.log('User birth data is added to the ledger Succesfully..');
  }

  async deleteBirthData(ctx,userId) {
    await ctx.stub.deleteState(userId); 
    console.log('User birth data is deleted from the ledger Succesfully..');
  }

}

module.exports=testContract;
