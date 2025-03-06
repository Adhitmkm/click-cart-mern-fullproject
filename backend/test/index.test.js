// run code = npx jest index.test.js
const axios2 = require("axios");


// const axios = {
//     post: async (...args) => {
//         try {
//             const res = await axios2.post(...args)
//             return res
//         } catch(e) {
//             return e.response
//         }
//     },
//     get: async (...args) => {
//         try {
//             const res = await axios2.get(...args)
//             return res
//         } catch(e) {
//             return e.response
//         }
//     },
//     put: async (...args) => {
//         try {
//             const res = await axios2.put(...args)
//             return res
//         } catch(e) {
//             return e.response
//         }
//     },
//     delete: async (...args) => {
//         try {
//             const res = await axios2.delete(...args)
//             return res
//         } catch(e) {
//             return e.response
//         }
//     },
// }



BACKEND_URL = "http://localhost:5000";

test("User is able to signup", async () => { // test function (note , pinney function)
  firstName = `adhill-${Math.random()}`;
  lastName = "w";
  email = "asdff@gmail.com";
  password = "123456";

  const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
    firstName,
    lastName,
    email,
    password,


  });

  expect(response.status).toBe(200);
});


test("user test second also fail", async () => { // test function (note , pinney function)
    firstName = `adhill-${Math.random()}`;
    lastName = "w";
    email = "asdff@gmail.com";
    password = "123456";
  
    const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
  
  
    });
  
    expect(response.status).toBe(400);
});