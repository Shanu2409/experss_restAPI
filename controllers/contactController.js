const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@des get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@des get one contacts
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  console.log(!contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@des create contacts
//@route post /api/contacts
//@access private

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
    user_id: req.user.id,
    //in ES6 if key and value name are same no need to specify both just name and next is enough
  });

  res.status(200).json(contact);
});

//@des update contacts
//@route put /api/contacts/:id
//@access private

const putContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    console.log("not found");
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to alter other user contact");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@des delete contacts
//@route delete /api/contacts/:id
//@access private

const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to delete other user contact");
  }

  await Contact.deleteOne({ _id: req.params.id });
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
