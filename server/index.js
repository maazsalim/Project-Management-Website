const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "project_management",
});

app.post("/create", (req, res) => {
  const Name = req.body.Name;
  const Pleader = req.body.Pleader;
  const No_of_components = req.body.No_of_components;
  const Budget = req.body.Budget;
  const Components_completed = req.body.Components_completed;

  db.query(
    "INSERT INTO projects (`Project Name`, `Project Leader`, `Number of Components`, `Budget`, `Components Completed`) VALUES (?,?,?,?,?)",
    [Name, Pleader, No_of_components, Budget, Components_completed],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.put("/update", (req, res) => {
    const id = req.body.id;
    const Components_completed = req.body.Components_completed;
    db.query(
      "UPDATE projects SET `Components Completed` = ? WHERE id = ?",
      [Components_completed, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM projects WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("your server is running on port 3001");
});