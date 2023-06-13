const express = require('express');
const fs = require("fs")
const path = require("path")
const router = express.Router();
var test;
console.log('router loaded');
var r=require('./config.js');

router.get('/', function(req, res){
    
    return res.render('index');
});


router.post('/hello', async function(req,res){
    async function func(){
    
        const execSync = require('child_process').execSync;
    
        const output =  execSync('npx hardhat functions-simulate --configpath routes/config.js', { encoding: 'utf-8' });  // the default is 'buffer'
        console.log('Output was:\n', output);
    }
    test= req.body.roll;
    async function set(x){
        r.args=[x];
        r.source=fs.readFileSync(path.resolve(__dirname, "source.js")).toString();
        console.log(r);
        return
    }
    await set(test);
    await func();
     return;
})




module.exports = router;