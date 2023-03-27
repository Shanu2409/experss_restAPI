const express = require("express");
const {
  getContact,
  getContacts,
  putContacts,
  deleteContacts,
  postContacts,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getContacts).post(postContacts);

router.route("/:id").get(getContact).put(putContacts).delete(deleteContacts);

module.exports = router;
