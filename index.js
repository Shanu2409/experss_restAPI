const experss = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = experss();

const PORT = process.env.PORT || 5000;
app.use(experss.json());

app.use("/api/contacts", require("./routes/contactRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express.js is running on https://localhost:${PORT}`);
});
