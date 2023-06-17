// const test = require("./index.js")
const inputRollNumber = args[0];
const url = "https://pi360.net/site/api/student_meta_data.php";
const instituteId = "mietjammu";
const key = "QUFqSDg3Kjk2cC00NCNAaFc=";

console.log(`Get student details for roll number: ${inputRollNumber}`);
console.log(`HTTP POST Request to ${url}`);

const countryRequest = Functions.makeHttpRequest({
  url: `${url}?institute_id=${instituteId}&rollno=${inputRollNumber}&key=${key}`,
  method: "POST",
});

// Execute the API request (Promise)
const countryResponse = await countryRequest;

if (countryResponse.error) {
  console.error(
    countryResponse.response ? `${countryResponse.response.status},${countryResponse.response.statusText}` : ""
  );
  throw Error("Request failed");
}

const countryData = countryResponse.data;

if (!countryData || !countryData.student || countryData.student.length === 0) {
  throw Error(`Student with roll number "${inputRollNumber}" not found`);
}

console.log("Student response", countryData);

// Extract required values from the response
const { Name: studentname, RollNumber: rollno, DateofAdmission: admissiondate, CocubesScore: cocubesscore } = countryData["student"][0];

// Create the result object
const result = {
  studentname,
  rollno,
  admissiondate,
  cocubesscore,
};
function returnUpdatedValue(){
  return result;
}
// // console.log(result);
// // console.log("output is", test);



// Use JSON.stringify() to convert from JSON object to JSON string
// Finally, use the helper Functions.encodeString() to encode from string to bytes
// return Functions.encodeString(JSON.stringify(result));
