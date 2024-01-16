const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

/*app.post("/create", (req, response) => {
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return response.json("Error");
        return response.json(result);
    })
})*/

app.post("/create", (req, response) => {
    // Handle POST request for /create
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return response.status(500).json({ error: "Internal Server Error" });
        }
        return response.json(result);
    });
});

app.put("/update/:id", (req, response) => {
    // Handle PUT request for /update
    const sql = "UPDATE student SET `Name` = ? , `Email` = ? WHERE ID = ?";
    const values = [req.body.name, req.body.email];
    const id = req.params.id; // Getting the ID through params hook

    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return response.status(500).json({ error: "Internal Server Error" });
        }
        return response.json(result);
    });
});

app.delete("/remove/:id", (req, response) => {
    // Handle PUT request for /update
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id; // Getting the ID through params hook

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return response.status(500).json({ error: "Internal Server Error" });
        }
        return response.json(result);
    });
});

app.listen(8081, () => {
    console.log("listening");
})
