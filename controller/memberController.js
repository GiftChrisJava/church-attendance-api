const entities = require("../model");

const Member = entities.member;
const Organisation = entities.organisation;
const Attendance = entities.attendance;
const Contact = entities.contact;

// add a member
const createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    return res.status(201).json({ member });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all members
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    return res.status(200).json({ members });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a single member by id
const getMemberById = async (req, res) => {
  try {
    // get a member with club and attendance, contact details
    const member = await Member.findByPk(req.params.id, {
      include: [
        { model: Organisation },
        { model: Attendance },
        { model: Contact },
      ],
    });

    if (!member) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ member });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get a member by name
const getMemberByName = async (req, res) => {
  try {
    const name = req.params.name;
    const member = await Member.findOne({
      where: { name },
      include: [
        { model: Organisation },
        { model: Attendance },
        { model: Contact },
      ],
    });

    if (!member) {
      return res.status(404).send({ message: "Member not found" });
    }

    res.send({ data: member });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// get a member by yearOfStudy
const getMemberByYearOfStudy = async (req, res) => {
  try {
    const yearOfStudy = req.params.yearOfStudy;
    const member = await Member.findAll({
      where: { yearOfStudy },
    });

    if (!member) {
      return res.status(404).send({ message: "Members not found" });
    }

    res.send({ data: member });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// get a member by Location
const getMemberByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    const member = await Member.findAll({
      where: { location },
    });

    if (!member) {
      return res.status(404).send({ message: "Members not found" });
    }

    res.send({ data: member });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// get a member by hometown
const getMemberByHometown = async (req, res) => {
  try {
    const hometown = req.params.hometown;

    const member = await Member.findAll({
      where: { hometown },
    });

    if (!member) {
      return res.status(404).send({ message: "Members not found" });
    }

    res.send({ data: member });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

// update a member
const updateMember = async (req, res) => {
  try {
    // we need an id
    const { id } = req.params;
    const [updatedMember] = await Member.update(req.body, {
      where: { id },
      returning: true,
    });

    // if member was not found
    if (!updatedMember) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ updatedMember });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete a member
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMember = await Member.destroy({ where: { id } });

    if (!deletedMember) {
      return res.status(404).json({ error: "Not Found" });
    }

    return res.status(200).json({ deletedMember });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  getMemberByLocation,
  getMemberByName,
  getMemberByYearOfStudy,
  getMemberByHometown,
  createMember,
  updateMember,
  deleteMember,
};
