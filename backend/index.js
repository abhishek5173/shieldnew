const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authroutes = require('./routes/authroutes');
const book = require('./routes/book');


const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.use(cors());


app.use("/api/auth", authroutes)
app.use("/book",book)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
