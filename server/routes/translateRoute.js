const express = require('express');
const {listOfLanguages, translateText} = require('../controller/translateContoller');


const  router = express.Router();
router.route("/").get(listOfLanguages);
router.route("/").post(translateText);


  
module.exports = router;