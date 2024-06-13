const axios = require('axios');

const headers = {
    "Content-Type": "application/json",
    "User-Agent": "PostmanRuntime/7.39.0",
    "Accept": "*/*",
    "Cache-Control": "no-cache",
    "Host": "20.244.56.144",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive"
};

const getAuthToken = async (clientID, clientSecret) => {
    const authUrl = "http://20.244.56.144/test/auth";
    const authData = {

        companyName: "KL University",
        clientID: clientID,
        clientSecret: clientSecret,
        ownerName: "Chekuri Lakshmi Sai Varma",
        ownerEmail: "2100031709cseh@gmail.com",
        rollNo: "2100031709"
    };

    try {
        const response = await axios.post(authUrl, authData, { headers });
        if (response.status === 200) {
            console.log("Authorization successful");
            console.log(`Token: ${response.data.access_token}`);
            return response.data.access_token;
        } else {
            console.log(`Authorization failed: ${response.status} - ${response.statusText}`);
            console.log("Response Data:", response.data);
        }
    } catch (error) {
        console.error(`Error occurred during authorization`);
        if (error.response) {
            console.error(`Error Status: ${error.response.status}`);
            console.error(`Error Status Text: ${error.response.statusText}`);
            console.error(`Error Data:`, error.response.data);
        } else {
            console.error(`Error Message: ${error.message}`);
        }
    }
};

const clientID = 'dfab9616-90ef-44f4-b6f4-4c0f72d903c1';  
const clientSecret = 'OuHPFbNsKIPKwocW';  
getAuthToken(clientID, clientSecret);
