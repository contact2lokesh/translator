# Translator
- A translator which uses Google cloud Translation API in the background , stores the translated results in cache memory to prevent regular multiple hits to api .

# Design Description
- Used Google cloud Translation for language translation.
- Used Node cache for caching.
- "dependencies": {
    "@google-cloud/translate": "^6.3.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "google-translate": "^3.0.0",
    "node-cache": "^5.1.2",
    "nodemon": "^2.0.15"
  }
# How to Setup & Run the Server
- Clone the repo 
- Install node modules : ``` npm install```
- Run ``` node index.js ```
- Go to ```localhost:5000```
- Base Url  is ```api/translate```

# Cache Database Schema 
- Used ``` node-cache ``` which storring data as key-value pair in Object
-Object :
 ```
   let obj ={
                text:text,
                targetLanguage:lang
            }
 ```
 - node-cache methods used - 
 
   ```myCache.has(str)``` : Checks if cache has this particular word stored in memory and returns a boolean
   
   ```myCache.get(str)``` : Retrieves the value from the cache 
   
   ```myCache.set(str, res.translation)``` :  Stores a key-value pair in the cache memory.