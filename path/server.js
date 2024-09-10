const express = require("express");
const app = express();
const port = 3003;
const cors = require('cors');

app.use(cors());

app.get("/", (req,res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.listen(port, () => console.log(`Server http://localhost:${port}`));