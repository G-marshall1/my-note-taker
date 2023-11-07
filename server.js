const express = require("express");
const path = require("path")
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3001;
// middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// app.get("/assets/css/styles.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"))
// })


// html routes
app.get("/notes", (req, res) => {
    // res.send("Hi!")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

// api routes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, content) => {
        if(err) {
            console.log(err);
        }

        const data = JSON.parse(content)

        res.json(data)
    })
})

app.post("/api/notes", (req, res) => { 

    console.log(req.body);

    fs.readFile("./db/db.json", "utf-8", (err, content) => {
        if(err) {
            console.log(err);
        }

        const data = JSON.parse(content);

        data.push({
            title: req.body.title,
            text: req.body.text,
        })

        fs.writeFile("./db/db.json", JSON.stringify(data, null, 4), (err) => {

            res.json(data)
        })

    })
})





app.listen(PORT, () => {
    console.log("Server is running")
})