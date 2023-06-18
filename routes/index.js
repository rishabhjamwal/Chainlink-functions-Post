const express = require('express');
const fs = require("fs")
const path = require("path")
const router = express.Router();
const axios = require('axios')
// const {returnUpdatedValue} = require("./source");
const execSync =require('child_process').execSync;
var test;

console.log('router loaded');
var r=require('./configTemplate.js');

isLoading = true;
// window.addEventListener("load",()=>{
//     const loader = document.querySelector(".loader");
//     loader.classList.add("loader-hidden");
//     loader.addEventListener("transitionend",()=>{
//         document.body.removeChild("loader");
//     })
// })

router.get('/', function(req, res){
    return res.render('index');
});
router.get('/studentdata', function(req, res){

    return res.render('std');
});

  
  
  

router.post('/hello', async function(req,res){
    
    // function fetchLinkFromConsoleOutput(consoleOutput) {
    //     const regex = /https:\/\/mumbai\.polygonscan\.com\/tx\/[a-zA-Z0-9]+/;
    //     const match = consoleOutput.match(regex);
        
    //     if (match) {
    //       return match[0];
    //     } else {
    //       return null;
    //     }
        
    //   } 

    // const dynamicConsoleOutput = runScript()  
    test= req.body.roll;
    const inputRollNumber =test;
    
    

    const url = "https://pi360.net/site/api/student_meta_data.php";
    const instituteId = "mietjammu";
    const key = "QUFqSDg3Kjk2cC00NCNAaFc=";

    console.log(`Get student details for roll number: ${inputRollNumber}`);
    console.log(`HTTP POST Request to ${url}`);

    const countryRequest = axios.get(`${url}?institute_id=${instituteId}&rollno=${inputRollNumber}&key=${key}`);
    const countryResponse = await countryRequest;
    console.log(countryResponse.data)
    const jdata = JSON.stringify(countryResponse.data)
    req.session.data = jdata

    const sessionData = JSON.parse(jdata);

    const { student } = sessionData;
    const { 
        Name,
        RollNumber,
        DateofAdmission,
        PassoutYear,
        DOB,
        Course,
        Gender,
        AcademicIndex,
        CocubesScore,
        ExtraCurricularIndex,
        CoCurricularIndex,
        OverallIndex,
        EntranceScore,
        Education,
        DetailedAcademics,
        OverallAcademics,
        Certifications,
        Projects,
        Internships,
        Experience,
        State,
        City
    } = student[0];

    
    async function createFile(){
        const mkPath=path.resolve(__dirname,'config.js');
        fs.access(mkPath, fs.constants.F_OK, (err) => {
            // if (err) {
            //     execSync(`type nul > ${mkPath}`, { encoding: 'utf-8' });
            // } else {
            //     execSync(`del ${mkPath}`, { encoding: 'utf-8' });
            //     execSync(`type nul > ${mkPath}`, { encoding: 'utf-8' });
            // }
          });
        console.log("hfejeffef",mkPath);
        
    }
    async function runScript() {
        execSync('/home/rishabh/Chainlink-functions-Post/routes/script.sh', { encoding: 'utf-8' });
    
    }
    await createFile();
    await createConfigFileWithArgs(test);

    await runScript()

    isLoading = false;
    // await fetchLatestTransaction();
    const response = await axios.get(`https://api-testnet.polygonscan.com/api?module=account&action=txlist&address=0x3E906e3e2eCDEcde976EF05b853590E94b7f8d4e&startblock=0&endblock=99999999&sort=desc&apikey=PQ84BZTK8GFWN9WN53G4Y33AUSD5T5GPFD`);
    const data = response.data;
          
          // Retrieve the latest transaction
    const latestTransaction = data.result[0];
          
          // Extract the transaction details
    const transactionHash = latestTransaction.hash;
    const blockNumber = latestTransaction.blockNumber;
    const timestamp = latestTransaction.timeStamp;
          
          // Output the transaction details
          
    console.log('Latest Transaction:');
    console.log('Transaction Hash:', transactionHash);
    console.log('Block Number:', blockNumber);
    console.log('Timestamp:', new Date(timestamp * 1000));
    // fetchLinkFromConsoleOutput(dynamicConsoleOutput);
    // const link = fetchLinkFromConsoleOutput(dynamicConsoleOutput);
    // console.log("Mahesh dalle", link)
    
    // const updatedResult = returnUpdatedValue();
    // console.log(updatedResult.admissiondate);
    req.session.data = transactionHash;
    // return res.render('std', { transactionHash: transactionHash });
   
    return res.render('std', { 
        Name,
        RollNumber,
        DateofAdmission,
        PassoutYear,
        DOB,
        Course,
        Gender,
        AcademicIndex,
        CocubesScore, 
        ExtraCurricularIndex,
        CoCurricularIndex,
        OverallIndex,
        EntranceScore,
        Education,
        DetailedAcademics,
        OverallAcademics,
        Certifications,
        Projects,
        Internships,
        Experience,
        State,
        City,
        transactionHash
        
        
    });

});



async function createConfigFileWithArgs(rollNo) {
  const filePath = path.resolve(__dirname,'config.js');
  const templateFilePath = path.resolve(__dirname, 'configTemplate.js');
  const data =fs.readFileSync(templateFilePath, 'utf8');

    const modifiedData = data.replace(/args:\s*\[.*?\]/, `args: ["${rollNo}"]`);

    fs.writeFileSync(filePath, modifiedData, 'utf8')

    console.log('New config file created with dynamic args.');
    
};





module.exports = router;