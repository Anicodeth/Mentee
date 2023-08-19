const request = require('supertest');

const mongoose = require("mongoose")
const app = require('../index'); // Replace '../app' with the path to your Express app
const { describe } = require('node:test');
const exp = require('constants');

// replace the token variable with a valid token to use for end points.
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGMxNmFhYjk3ZmNjZjUzNGI5NDljMjMiLCJlbWFpbCI6Imx1ZGFAZ21haWwuY29tIiwiaWF0IjoxNjkwMzk3Mzg4LCJleHAiOjE2OTA0MDA5ODh9.3XM7aF891cnbEZG2ypw5zhXH_lqxDpktqLPoX7VeAGs"
describe('API Endpoint Tests', () => {
    jest.setTimeout(10000);

    afterAll(async () => {
        await mongoose.connection.close();
      }, 10000); 


/// testing the create new class functionality
  describe('POST /classes/createClass', () => {
    it('should create a new class', async () => {
        const classDetails = {
            name: "chemistry",
            type: "chemistry",
            description: "a class about chemistry",
            schedule: "2023-07-20T12:00:00.000Z",
            price: 50
          };
    
        const response = await request(app)
          .post('/classes/createClass')
          .set('Authorization', token)
          .send(classDetails);
        // console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', classDetails.name);
        expect(response.body).toHaveProperty('type', classDetails.type);
        // Add more assertions as needed for the response data
      });
  });


  /// testing the logging in functionality
 describe("POST /users/login", () =>{
    it("should login the user", async () =>{
        const loginDetails = {
            email: "abat@gmail.com",
            password: "password"
      };
        const response = await request(app)
        .post('/users/login')
        .send(loginDetails);
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    
        });
    
 })
    /// testing signing up functionality

    describe ("POST /users", () =>{
        it('should sign up the user', async () => {
    
            const userDetails = {
                name: "usher",
                email: "usher@gmail.com",
                password: "password",
                role: "student" 
        
        }
    
        const response = await request(app)
        .post('/users')
        .send(userDetails);
    
        expect(response.status).toBe(201);
    });
    
    })

    //test to get the user details on need
    describe ("GET /users/me", () => {
        it('should get the user details', async () => {
            const response = await request(app)
            .get('/users/me')
            .set('Authorization', token)
            .send();
    
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name');
        });
     })

     //test to delete the user upon request

     describe ("DELETE /users/", () => {
        it('should delete the user', async () => {
            const response = await request(app)
            .delete('/users/')
            .set('Authorization', token)
            .send();
    
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('name');
        })
     })


     //test to test updation of a user upon request
    describe ("PUT /users/", () => {
        it('should update the user', async () => {
            const userDetails = {
                name: "kendrick",
                email: "snoop@gmail.com",
                password: "amanPassword",
                role: "student"
            }
        const response = await request(app)
        .put('/users/')
        .set('Authorization', token)
        .send(userDetails);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', userDetails.name);
    })
    })

    /// test getting all classes

   describe ("GET /classes", () => {
    it('should get all classes', async () => {
        const response = await request(app)
        .get('/classes')
        .set('Authorization', token)
        .send();

        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty('classes');
    });

   })

    // test to search class by its ID
    describe('GET /classes/id/:id', () => {
        it('should search a class by its ID', async () => {
          const classId = 'SEARCH_CLASS_ID_HERE'; // Replace with a valid class ID
      
          const response = await request(app)
            .get(`/classes/id/${classId}`)
            .set('Authorization', token); // Replace with a valid auth token
      
          expect(response.status).toBe(200);
          // Add more assertions as needed for the response data
        });
      
        // Add more test cases, such as searching for a non-existing class or unauthorized search
      });
      

      // test for searching my own classes
      describe('GET /classes/my-classes', () => {
        it('should get classes created by the authenticated instructor', async () => {
          const response = await request(app)
            .get('/classes/my-classes')
            .set('Authorization', token); // Replace with a valid auth token
      
          expect(response.status).toBe(200);
          // Add more assertions as needed for the response data
        });
      
        // Add more test cases, such as unauthorized access
      });
      
    // test for the searching functionality
    describe('POST /classes/search', () => {
        it('should search for classes by type or name', async () => {
          const searchInput = 'Math'; // Replace with a valid search input
      
          const response = await request(app)
            .post('/classes/search')
            .set('Authorization', 'YOUR_AUTH_TOKEN') // Replace with a valid auth token
            .send({ query: searchInput });
      
          expect(response.status).toBe(200);
          // Add more assertions as needed for the response data
        });
      
        // Add more test cases, such as searching with different inputs or unauthorized search
      });

      /// test the functionality of displaying the classes enrolled by the user
    describe('GET /enrollments/user', () => {
        it('should return the class enrolled by the user', async () => {
            const response = await request(app)
            .get('/enrollments/user')
            .set('Authorization', token)// Replace with a valid auth token
            .send();

            expect(response.status).toBe(200);
        })
    });

    // test the functionality of displaying the users enrolled in a class
    describe('GET /enrollments/class/:classId', () =>  {
      it('should return the users in the class', () => async () => {
        const classId = '64beb11aeb0ca4f32b75f475'; // Replace with a valid class ID you want to test with 
        const response = await request(app)
        .get(`/enrollments/class/${classId}`)
        .set('Authorization', token)// Replace with a valid auth token
        .send();

        expect(response.status).toBe(200);
      })
    })

    // test the functionality to enroll a user in a class
    describe('POST /enrollments', () => {
        it('should enroll the user in the class', async () => {
            const classDetails = {
                classId: "64bf66d494b4f29a6a376738",
              };
            const response = await request(app)
            .post('/enrollments')
            .set('Authorization', token)// Replace with a valid auth token
            .send(classDetails);

            expect(response.status).toBe(201);
        })
    })

    // test the end point for updating the class
    describe('PUT /classes/:id', () => {
        it('should update the class details of the class with the id passed as the parameter', async () => {

            const classDetails = {
                name: "chemistry",
                type: "walter white",
                description: "a class about chemistry",
                schedule: "2023-07-20T12:00:00.000Z",
                price: 50
              };
            const classId = '64bae28bdaf285007d86b437'; // Replace with a valid class ID you want to test with 
            const response = await request(app)
            .put(`/classes/${classId}`)
            .set('Authorization', token)// Replace with a valid auth token
            .send(classDetails);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("type", classDetails.type);
        });

    })

    // test the end point for deleting a class
    describe('DELETE /classes/${classId}', ()  => {
        it('should delete the class with the id in the params', async () => {
            const classId = '64c0316d1e57e136aa2cfb09'; // Replace with a valid class ID you want to test with 
            const response = await request(app)
            .delete(`/classes/${classId}`)
            .set('Authorization', token)// Replace with a valid auth token
            .send();

            expect(response.status).toBe(200);
            

        })
    })   
      
})


  // Add more test cases for other endpoints