// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("welcome");
// });

// app.listen(port, () => {
//   console.log("Server is running on port", port);
// });

//----------------------------------------------------------------

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   const { name, age } = req.query;
//   res.send(`${name},${age}`);
// });

// app.listen(port, () => {
//   console.log("Server is running on port", port);
// });

//----------------------------------------------------------------

const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get("/", (req, res) => {
  const { name, age } = req.query;
  res.send(`${name}, ${age}`);
});

app.post("/contact", (req, res) => {
  const { name, phone, email } = req.body;

  if (!name) {
    return res.status(422).json({ error: "Name is required." });
  }

  res.status(200).json({
    message: `Contact details for ${name} received as ${phone} and ${email}`,
  });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
