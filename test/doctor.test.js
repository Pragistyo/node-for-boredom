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
        response.body.queryName.should.be.equal('All Doctors')
        response.body.data.should.be.an('array')
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
          response.body.queryName.should.be.equal('DoctorbyId')
          response.body.data.should.be.an('object')
          response.body.data.should.have.property('firstname')
          response.body.data.should.have.property('middlename')
          response.body.data.should.have.property('lastname')
          response.body.data.should.have.property('mobilenumber')
          response.body.data.should.have.property('gender')
          response.body.data.should.have.property('address1')
          response.body.data.should.have.property('address2')
          response.body.data.should.have.property('state')
          response.body.data.should.have.property('zipcode')
          response.body.data.should.have.property('birthplace')
          response.body.data.should.have.property('birthday')
          response.body.data.should.have.property('nik')
          response.body.data.should.have.property('certificate')
          response.body.data.should.have.property('specialization')
          response.body.data.should.have.property('datecertification')
          response.body.data.should.have.property('countpatientnumber')
      //   assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });


