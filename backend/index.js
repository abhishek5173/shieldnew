const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authroutes = require('./routes/authroutes');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());


app.use("/api/auth", authroutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
