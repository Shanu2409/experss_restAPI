const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@des get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@des get one contacts
//@route GET /api/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@des create contacts
//@route GET /api/contacts
//@access public

const postContacts = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,

    //in ES6 if key and value name are same no need to specify both just name and next is enough
  });
  res.status(200).json(contact);
});

//@des update contacts
//@route GET /api/contacts
//@access public

const putContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@des delete contacts
//@route GET /api/contacts
//@access public

const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.findOneAndRemove(req.params.id);
  console.log("Contact deleted successfully");
  res
    .status(200)
    .json({ message: `Delete contacts for id : ${req.params.id}` });
});

module.exports = {
  getContact,
  getContacts,
  putContacts,
  deleteContacts,
  postContacts,
};
