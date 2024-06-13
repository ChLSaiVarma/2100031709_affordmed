const axios = require('axios');
const express = require('express');
const port = 9876;
const app = express();
app.use(express.json());

const windowSize = 10;
let windowNumbers = [];

const updateWindowNumbers = (newNumbers) => {
    newNumbers.forEach(num => {
        if (!windowNumbers.includes(num)) {
            windowNumbers.push(num);
        }
    });

    if (windowNumbers.length > windowSize) {
        windowNumbers = windowNumbers.slice(-windowSize);
    }
};

const fetchData = async (url, headers) => {
    try {
        const response = await axios.get(url, { headers });
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        } else if (error.request) {
            console.error("Request made but no response received");
        } else {
            console.error("Error Message:", error.message);
        }
        throw new Error("Failed to fetch data from endpoint.");
    }
};

// Define API URLs for different endpoints
const apiUrlPrimes = "http://20.244.56.144/test/primes";
const apiUrlFibo = "http://20.244.56.144/test/fibo";
const apiUrlEven = "http://20.244.56.144/test/even";
const apiUrlRand = "http://20.244.56.144/test/rand";

// Replace with your actual credentials
const headers = {
    "Authorization": "Bearer arer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY4NTg2LCJpYXQiOjE3MTgyNjgyODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsInN1YiI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsImNsaWVudFNlY3JldCI6Ik91SFBGYk5zS0lQS3dvY1ciLCJvd25lck5hbWUiOiJDaGVrdXJpIExha3NobWkgU2FpIFZhcm1hIiwib3duZXJFbWFpbCI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE3MDkifQ.rMGLs7ynTXsHL3ZGRkT3dy0M2UEIRUd9-vApDggq6AI",
    //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY4MDUyLCJpYXQiOjE3MTgyNjc3NTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsInN1YiI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsImNsaWVudFNlY3JldCI6Ik91SFBGYk5zS0lQS3dvY1ciLCJvd25lck5hbWUiOiJDaGVrdXJpIExha3NobWkgU2FpIFZhcm1hIiwib3duZXJFbWFpbCI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE3MDkifQ.MG8AAd9jqOad11mu9BPr5SwIaD7B_hztfxaMlLOctlM",
    //  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY3OTkzLCJpYXQiOjE3MTgyNjc2OTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsInN1YiI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsImNsaWVudFNlY3JldCI6Ik91SFBGYk5zS0lQS3dvY1ciLCJvd25lck5hbWUiOiJDaGVrdXJpIExha3NobWkgU2FpIFZhcm1hIiwib3duZXJFbWFpbCI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE3MDkifQ.IOXpiol6XMgXwtxeHitjrMoT_BcqO5HyDCCMOVZG_Q",
    // yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY3NjE5LCJpYXQiOjE3MTgyNjczMTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsInN1YiI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsImNsaWVudFNlY3JldCI6Ik91SFBGYk5zS0lQS3dvY1ciLCJvd25lck5hbWUiOiJDaGVrdXJpIExha3NobWkgU2FpIFZhcm1hIiwib3duZXJFbWFpbCI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE3MDkifQ.RGL-pC1CGuiCzG6TBMiwUGAFpJYZj_K-C5IJvJUysAM",
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjY2MjEzLCJpYXQiOjE3MTgyNjU5MTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsInN1YiI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IktMIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6ImRmYWI5NjE2LTkwZWYtNDRmNC1iNmY0LTRjMGY3MmQ5MDNjMSIsImNsaWVudFNlY3JldCI6Ik91SFBGYk5zS0lQS3dvY1ciLCJvd25lck5hbWUiOiJDaGVrdXJpIExha3NobWkgU2FpIFZhcm1hIiwib3duZXJFbWFpbCI6IjIxMDAwMzE3MDljc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE3MDkifQ.-4D0S71Rhh9GuTWj19-98FmpGBUA5qlaXc4LTtk_vIU",
    "Content-Type": "application/json"
};

// Function to fetch data from all endpoints
const fetchAllData = async () => {
    try {
        // Array to store all fetched data
        let results = [];

        // Fetch data from each endpoint concurrently
        const [primes, fibo, even, rand] = await Promise.all([
            fetchData(apiUrlPrimes, headers),
            fetchData(apiUrlFibo, headers),
            fetchData(apiUrlEven, headers),
            fetchData(apiUrlRand, headers)
        ]);

        results.push(primes, fibo, even, rand);

        return results;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error; // Re-throw the error to handle it outside
    }
};

// Fetch all data and handle results
fetchAllData().then(results => {
    if (results) {
        console.log("Data fetched successfully:", results);
    }
}).catch(err => {
    console.error("Failed to fetch all data:", err.message);
});

// API endpoint to handle requests
app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid.toLowerCase();
    let newNumbers;

    try {
        const results = await fetchAllData();

        if (!results) {
            return res.status(500).json({ error: "Failed to fetch data from the endpoints." });
        }

        let windowPrevState = []; 
        let windowCurrState = []; 

        const averagePrevState = calculateAverage(windowPrevState);
        const averageCurrState = calculateAverage(windowCurrState);

        switch (numberid) {
            case 'p':
                newNumbers = results[0];
                res.send({
                    numbers: newNumbers,
                    windowPrevState: windowPrevState,
                    windowCurrState: windowCurrState,
                    avg: averagePrevState
                });
                break;
            case 'f':
                newNumbers = results[1];
                res.send({
                    numbers: newNumbers,
                    windowPrevState: windowPrevState,
                    windowCurrState: windowCurrState,
                    avg: averageCurrState
                });
                break;
            case 'e':
                newNumbers = results[2];
                res.send({
                    numbers: newNumbers,
                    windowPrevState: windowPrevState,
                    windowCurrState: windowCurrState,
                    avg: averageCurrState
                });
                break;
            case 'r':
                newNumbers = results[3];
                res.send({
                    numbers: newNumbers,
                    windowPrevState: windowPrevState,
                    windowCurrState: windowCurrState,
                    avg: averageCurrState
                });
                break;
            default:
                return res.status(400).json({ error: "Invalid numberid. Use 'p', 'f', 'e', or 'r'." });
        }
    } catch (error) {
        console.error("Error handling request:", error.message);
        res.status(500).json({ error: "Failed to process the request." });
    }
});

function calculateAverage(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return 0; 
    }
    const sum = array.reduce((acc, val) => acc + val, 0);
    return sum / array.length;
}
