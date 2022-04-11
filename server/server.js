const express = require('express');
const dotEnv = require('dotenv');
const router = require('./routes/translateRoute');
const cors = require('cors');

const app = express();
dotEnv.config();
app.use(express.json());

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"],
}));

app.get("/", (req, res) => {
    res.send("API is running..");
  });

app.use("/api/translate", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(
    `server is running successfully on port http://localhost:${PORT}/`
  );
});

