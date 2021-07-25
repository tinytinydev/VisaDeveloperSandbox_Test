const configs = require("./configs.js");
const api_paths = require("./api_path.js");
const axios = require('axios');
const express = require('express');
const API_BASE = "https://sandbox.api.visa.com/"

var port = 3000;
const app = express();

const requestOptions = {
    httpsAgent: configs.httpsAgent,
    headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json',
      'Authorization' : 'Basic ' + new Buffer.from(configs.userId + ':' + configs.password).toString('base64')
    }
};

app.get('/helloworld',(req,res)=>{
    axios.get(API_BASE + "vdp/helloworld",requestOptions).then(response=>{
          res.send(response.data);
      })
})

app.get("/companies",(req,res)=>{
    let bankId = req.query.bankId;
    var url =  API_BASE + api_paths.GET_COMPANIES + "?bankId=" + bankId
    axios.get(url,requestOptions).then(response=>{
      response.data.queryUrl = url;
      res.send(response.data);
    })
})

app.get("/banks/:bankId",(req,res)=>{
  let bankId = req.params["bankId"];
  var url =  API_BASE + api_paths.GET_BANKS + "/" + bankId
  axios.get(url,requestOptions).then(response=>{
    response.data.queryUrl = url;
    res.send(response.data);
  })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })