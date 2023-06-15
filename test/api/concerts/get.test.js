const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Jimi Hendrix', genre:'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
        await testConOne.save();
        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Jimi', genre:'Rock', price: 55, day: 1, image: '/img/uploads/hdfh42sd213.jpg' });
        await testConTwo.save();
       
      });
      
      after(async () => {
        await Concert.deleteMany();
      });


    it('/ should return all concerts of given performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Jimi Hendrix');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.not.be.null;
    
    });

    it('/ should return all concerts of given genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    
    });
    it('/ should return all concerts of given price range', async () => {
        const priceMin = 20;
        const priceMax = 30;
        const res = await request(server).get(`/api/concerts/price/${priceMin}/${priceMax}`);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        res.body.forEach((concert) => {
          expect(concert.price).to.be.within(priceMin, priceMax);
        });
    });
    it('/ should return all concerts in given day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    
    });
  });