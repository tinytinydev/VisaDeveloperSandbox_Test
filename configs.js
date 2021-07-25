const https  = require("https");
var fs = require('fs');

//Certificates
const keyFile = "./certs/{Private_Key}";
const certificateFile = "./certs/{Client_Cert}";
const caFile = "./certs/{Visa_Developer_Platform_CA_Cert}";

//Project Credentials
const userId = "{VDP_UserId}";
const password = "{VDP_Password}";

//Configurations for HttpsAgent to call Visa Developer API
const httpsAgent = new https.Agent({
    cert: fs.readFileSync(certificateFile),
    ca: fs.readFileSync(caFile),
    key: fs.readFileSync(keyFile)
})

module.exports = {
    userId,
    password,
    httpsAgent
}