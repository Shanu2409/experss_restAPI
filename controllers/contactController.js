//@des get all contacts
//@route GET /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: "Fetch all the contacts" });
};

//@des get one contacts
//@route GET /api/contacts
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `Fetch data for id : ${req.params.id}` });
};

//@des create contacts
//@route GET /api/contacts
//@access public

const postContacts = (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(200).json({ message: "Create new contacts" });
};

//@des update contacts
//@route GET /api/contacts
//@access public

const putContacts = (req, res) => {
  res
    .status(200)
    .json({ message: `Update contacts for id : ${req.params.id}` });
};

//@des delete contacts
//@route GET /api/contacts
//@access public

const deleteContacts = (req, res) => {
  res
    .status(200)
    .json({ message: `Delete contacts for id : ${req.params.id}` });
};

module.exports = {
  getContact,
  getContacts,
  putContacts,
  deleteContacts,
  postContacts,
};
