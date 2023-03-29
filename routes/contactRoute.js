const express = require("express");
const {
  getContact,
  getContacts,
  putContacts,
  deleteContacts,
  postContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);

router.route("/").get(getContacts).post(postContacts);

router.route("/:id").get(getContact).put(putContacts).delete(deleteContacts);

module.exports = router;
