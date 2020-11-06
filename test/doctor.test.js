// const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../start.js');
const should = chai.should()

chai.use(chaiHttp)

describe(`ENDPOINT: '/provisions/api/v1/doctors' `,() =>{
  describe('Return Array All Doctor', () =>{
    it('should return all doctor data', async () => {
        // await Promise.resolve()
        let response = await chai.request(app).get('/provisions/api/v1/doctors')
        response.status.should.be.equal(200)
    //   assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe(`ENDPOINT: '/provisions/api/v1/doctors/:doctor_id' `,() =>{
    describe('Return Doctor with id 8', () =>{
      it('should return doctor_id = 8 doctor data', async () => {
          // await Promise.resolve()
          let response = await chai.request(app).get('/provisions/api/v1/doctors/8')
          response.status.should.be.equal(200)
      //   assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });


