const axios = require('axios');

// Correct registration URL
const registrationUrl = "http://20.244.56.144/test/register";

// Updated registration details
const registrationData = {
    companyName: "KL University",
    ownerName: "Chekuri Lakshmi Sai Varma",
    rollNo: "2100031709",
    ownerEmail: "2100031709cseh@gmail.com",
    accessCode: "LJnFsa"
};

// Headers for the POST request
const headers = {
    "Content-Type": "application/json",
    "User-Agent": "PostmanRuntime/7.39.0",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Host": "20.244.56.144",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive"
};

// Make the POST request
axios.post(registrationUrl, registrationData, { headers })
    .then(response => {
        if (response.status === 200) {
            console.log("Registration successful");
        } else {
            console.log(`Registration failed: ${response.status} - ${response.statusText}`);
        }
    })
    .catch(error => {
        console.error(`Error: ${error.response ? error.response.status : 'unknown'} - ${error.response ? error.response.statusText : error.message}`);
    });
