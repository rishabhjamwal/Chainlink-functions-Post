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

router.get('/', function(req, res){
    return res.render('index');
});
router.get('/studentdata', function(req, res){

    return res.render('std');
});

router.post('/hello', async function(req,res){
    // async function func(){
    
    //     // const execSync = require('child_process').execSync;
        
    //     const output =  execSync('npx hardhat functions-simulate --configpath routes/config.js', { encoding: 'utf-8' }); 
    //      // the default is 'buffer'
    //     console.log('Output was:\n', output);
    // }
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

    // await runScript();
    
    // const updatedResult = returnUpdatedValue();
    // console.log(updatedResult.admissiondate);
   
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
        City
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