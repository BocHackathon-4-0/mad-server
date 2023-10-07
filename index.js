const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env.development" });

const decodeJWT = require("./auth/decodeJWT");
const validateAccessToken = require("./auth/validateAccessToken");

// validate
// const validateUser = require("./auth/validateUser");

// api
const addFreelancerInvoice = require("./api/addFreelancerInvoice");
const getTaxBreakdown = require("./api/taxCalculator");

const app = express();
const port = process.env.PORT;

app.use(
  express.json({
    // eslint-disable-next-line no-return-assign
    verify: (req, res, buffer) => (req.rawBody = buffer),
  })
);

app.use(cors({ origin: true }));

app.use(decodeJWT);

/// GET
app.get("/", (req, res) => res.send("Hello World"));

// app.get("/get-time", getTime);

/// POST

app.post("/add-freelancer-invoice", validateAccessToken, addFreelancerInvoice);
app.get("/tax-calculator", getTaxBreakdown);

// use a get to use get jinus api and filter by initials in documentnumber
// app.get("/freelancer-invoics", validateAccessToken, );

app.listen(port, () => {
  console.log(
    "[ >>> Server listening on port",
    port,
    process.env.ENVIRONMENT,
    "<<<",
    new Date().toUTCString(),
    "]"
  );
});
