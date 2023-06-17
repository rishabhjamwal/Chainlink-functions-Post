#!/bin/bash

# Script to run the CLI command with three "yes" inputs

# Function to execute the CLI command
func() {
    output=$(  yes | yes | npx hardhat functions-request --subid 1809 --contract 0x3E906e3e2eCDEcde976EF05b853590E94b7f8d4e --network polygonMumbai --configpath routes/config.js)
    echo "Output was:"
    echo "$output"
}

# Call the function
func
