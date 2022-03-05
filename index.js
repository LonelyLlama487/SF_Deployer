const fetch = require("node-fetch");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
const creds = require("./Assets/config.json");
const parsedCredJson = JSON.parse(JSON.stringify(creds));

const ZEROTH_ELEMENT = 0;
const DISPALY_LABEL_STR = "display_label";
const USERNAME_STR = "username";
const PASSWORD_STR = "password";
const SECRET_TOKEN_STR = "secret_token";
const CLIENT_ID_STR = "client_id";
const CLIENT_SECRET_STR = "client_secret";

/* return salesforce Auth Token */
async function getAuthToken(...params){
    console.log("[+] Auth +change");
    let dispName = params[ZEROTH_ELEMENT][DISPALY_LABEL_STR];
    let uname = params[ZEROTH_ELEMENT][USERNAME_STR];
    let pass = params[ZEROTH_ELEMENT][PASSWORD_STR];
    let secTok = params[ZEROTH_ELEMENT][SECRET_TOKEN_STR];
    let client_id = params[ZEROTH_ELEMENT][CLIENT_ID_STR];
    let client_secret = params[ZEROTH_ELEMENT][CLIENT_SECRET_STR];
    console.log("[+] dispName :"+dispName);
    console.log("[+] uname :"+uname);
    console.log("[+] pass :"+pass);
    console.log("[+] secTok :"+secTok);
    console.log("[+] client_id :"+client_id);
    console.log("[+] client_secret :"+client_secret);
    // const response = await fetch('https://api.github.com/users/github');
    // const data = await response.json();

    // console.log(data);
}

async function getAllOrgs(){
    let allKeys = [];
    Object.keys(parsedCredJson).forEach((currentItem, index) => {
        allKeys.push(currentItem);
    });
    return allKeys;
}

async function getOrgInfo(orgKey,value){
    return await JSON.stringify(parsedCredJson[orgKey][value]);
}

async function mainFunc(){
    console.log("[+] Init");
    let allOrgs = await getAllOrgs();
    let dispStr= '';
    allOrgs.forEach((org,idx) => {
        if(dispStr){
            dispStr+="\n["+idx+"] "+parsedCredJson[org][DISPALY_LABEL_STR];
        }
        else{
            dispStr="\n["+idx+"] "+parsedCredJson[org][DISPALY_LABEL_STR];
        }
    });

    readline.question("which org to select? "+dispStr, selection => {
        console.log("Sel >> "+selection);
        readline.close();
    });
    getAuthToken(parsedCredJson[allOrgs[0]]);
}

mainFunc();