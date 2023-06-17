const express = require('express');
const fs = require("fs")
const path = require("path")
const router = express.Router();
const execSync =require('child_process').execSync;
var test;
console.log('router loaded');
var r=require('./configTemplate.js');

router.get('/', function(req, res){
    return res.render('index');
});


router.post('/hello', async function(req,res){
    async function func(){
    
        // const execSync = require('child_process').execSync;
        
        const output =  execSync('npx hardhat functions-simulate --configpath routes/config.js', { encoding: 'utf-8' }); 
         // the default is 'buffer'
        console.log('Output was:\n', output);
    }
    test= req.body.roll;
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

    await runScript();
    return res.render("/hello");
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