const entities = require("../model");

const Contact = entities.contact;
const Member = entities.member;

// create contacts
const createContacts = async (req, res) => {
  try {
    // get the owner of the contancts
    const member = await Member.findByPk(req.body.memberId);

    if (!member) {
      return res.status(404).json({ msg: "Member Not Found" });
    }

    // create contacts
    const contacts = await Contact.create({
      memberId: req.body.memberId,
      phone1: req.body.phone1,
      phone2: req.body.phone2,
    });

    return res.status(201).json({ contacts });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// create contacts by name
const createContactsByName = async (req, res) => {
  try {
    const name = req.params.name;

    // find a member by name
    const member = await Member.findOne({
      where: { name },
    });

    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // extract an id from member
    const memberId = member.id;
    console.log("member ID is " + memberId);

    // create contacts
    const contacts = await Contact.create({
      memberId: memberId,
      contact1: req.body.contact1,
      contact2: req.body.contact2,
    });

    return res.status(201).json({ contacts });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    return res.status(200).json({ contacts });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get a contact details by id
const getContactsbyId = async (req, res) => {
  try {
    const { id } = req.params.id;

    const contacts = await Contact.findByPk(id);

    if (!contacts) {
      return res.status(404).json({ msg: "Contact not Found" });
    }

    return res.status(200).json({ contacts });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// update the contacts of a particular member
const updateMemberContacts = async (req, res) => {
  try {
    // make the update
    const updatedContacts = await Contact.update(req.body, {
      where: {
        memberId: req.params.memberId,
      },
    });

    if (!updatedContacts) {
      return res.status(404).send({ message: "contacts not found" });
    }

    return res.status(200).json({ updatedContacts });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete Contact
const deleteContacts = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContacts = await Contact.destroy({ where: { id } });

    if (!deletedContacts) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContacts,
  getAllContacts,
  getContactsbyId,
  updateMemberContacts,
  deleteContacts,
  createContactsByName,
};
