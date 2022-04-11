const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();
const { json } = require("express");
const NodeCache = require("node-cache");

var languagesAll;

const CacheConstruct = new NodeCache();
// credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});


// list of all language
const listOfLanguages = async (req, res) => {
  try {
    const [languagesArr] = await translate.getLanguages();
    languagesAll = languagesArr;

    res.status(201).send(languagesArr);
  } catch (error) {
    console.log(`Error while getting languages --> ${error}`);
    res.send(error);
  }
};

// translating text
const translateText = async (req, res) => {
  const { text, targetLanguage } = req.body;
  const obj = JSON.stringify({ text: text, targetLanguage: targetLanguage });
  if (CacheConstruct.has(obj)) {
    console.log("received our obj from cache");
    res.send(CacheConstruct.get(obj));  
  } else {
    preSmartCaching(text);
    try {
      let [response] = await translate.translate(text, targetLanguage);
      CacheConstruct.set(obj, response); 
      res.send(response);
    } catch (error) {
      console.log("err");
    }
  }
};

//smart chaching
async function preSmartCaching(text) {
  const [languagesArr] = await translate.getLanguages();
  try {
    languagesArr &&
      languagesArr.forEach(async (lang) => {
        let obj = {
          text: text,
          targetLanguage: lang,
        };
        let strigifiedObj = JSON.stringify(obj);
        let response = await translate.translate(text, lang.code);
        CacheConstruct.set(strigifiedObj, response);
      });
    console.log("pre chaching done");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listOfLanguages, translateText };
