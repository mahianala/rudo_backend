const express = require("express");
const cors = require("cors");
const port = 8000;
const db = require("./db");

const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/transactions", (req, res) => {
  let query = `SELECT * FROM transactions;`;
  db.pool.query(query, (err, result) => {
    if (err) {
      res.send({
        success: false,
        error: err,
        message: "Failed to fetch transactions",
      });
    } else {
      res.send({
        success: true,
        data: result,
        message: "Transactions fetched successfully",
      });
    }
  });
});





  


app.get("/transactions/:id", (req, res) => {
    let id = req.params.id;
    let query = `SELECT * FROM transactions WHERE id=${id};`;
    db.pool.query(query, (err, result) => {
      if (err) {
        res.send({
          success: false,
          error: err,
          message: "Failed to fetch transactions",
        });
      } else {
        res.send({
          success: true,
          data: result,
          message: "Transaction fetched successfully",
        });
      }
    });
  });
  

app.post("/transactions", (req, res) => {
    console.log(req.body)
    let {amount,type,created_by} = req.body||{};
    let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = `INSERT INTO  transactions (amount,created_at,created_by,type) VALUES(${amount},"${created_at}","${created_by}","${type}");`;
    db.pool.query(query, (err, result) => {
      if (err) {
        res.send({
          success: false,
          error: err,
          message: "Failed to Add transaction",
        });
      } else {
        res.send({
          success: true,
          data: result,
          message: "Transaction Added successfully",
        });
      }
    });
  });

  app.put("/transactions/:id", (req, res) => {
    let transaction_id = req.params.id;
    let {amount,type} = req.body||{};
    let created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = `UPDATE transactions SET amount=${amount}, type="${type}", created_at="${created_at}" WHERE id=${transaction_id};`;
    db.pool.query(query, (err,result) => {
      if (err) {
        res.send({
          success: false,
          error: err,
          message: `Failed to Update transaction ${transaction_id}`,
        });
      } else {
        res.send({
          success: true,
          data : result,
          message: "Transaction Updated successfully",
        });
      }
    });
  });

app.delete("/transactions/:id", (req, res) => {
  let transaction_id = req.params.id;
  let query = `DELETE FROM transactions WHERE id=${transaction_id};`;
  db.pool.query(query, (err,result) => {
    if (err) {
      res.send({
        success: false,
        error: err,
        message: `Failed to delete transaction ${transaction_id}`,
      });
    } else {
      res.send({
        success: true,
        data : result,
        message: "Transaction Deleted successfully",
      });
    }
  });
});








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
