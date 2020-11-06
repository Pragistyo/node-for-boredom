// const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../start.js');
const should = chai.should()

chai.use(chaiHttp)

describe(`ENDPOINT: '/provisions/api/v1/doctors' ` ,() =>{
  describe('Return Array All Inpatient', () =>{
    it('should return all inpatient data', async () => {
        // await Promise.resolve()
        let response = await chai.request(app).get('/provisions/api/v1/inpatients')
        response.status.should.be.equal(200)
    //   assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe(`ENDPOINT: '/provisions/api/v1/doctors/:inpatient_id' `,() =>{
    describe('Return Inpatient with id 6', () =>{
      it('should return inpatient_id = 6 inpatient data', async () => {
          // await Promise.resolve()
          let response = await chai.request(app).get('/provisions/api/v1/inpatients/6')
          response.status.should.be.equal(200)
      //   assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });