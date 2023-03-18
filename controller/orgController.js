const { member } = require("../model");
const entities = require("../model");

const Organisation = entities.organisation;
const Attendance = entities.attendance;
const Member = entities.member;

// create an org
const createOrg = async (req, res) => {
  try {
    const organisation = await Organisation.create(req.body);

    return res.status(201).json({ organisation });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get all organisations
const getAllOrgs = async (req, res) => {
  try {
    const organisations = await Organisation.findAll();

    return res.status(200).json({ organisations });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get an org by Id
const getOrgById = async (req, res) => {
  try {
    const { id } = req.params;

    const organisation = await Organisation.findByPk(id, {
      include: [{ model: Member }],
    });

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation Not Found" });
    }

    return res.status(200).json({ organisation });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get Organisation by name
const getOrgByName = async (req, res) => {
  try {
    const orgName = req.params.orgName;

    const organisation = await Organisation.findOne({
      where: { orgName },

      // return all the members belonging to the org
      include: [{ model: Member }],
    });

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation not found" });
    }

    return res.status(200).json({ organisation });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get monthly attendance for this club
const getOrgMonthlyAttendance = async (req, res) => {
  try {
    const orgId = req.params.orgId;

    // find the organisation
    const organisation = await Organisation.findByPk(orgId);

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation Not Found" });
    }

    // find all members who attended who attended this month
    const AttendedMembers = await Member.findAll({
      include: [
        {
          model: Attendance,
          where: { orgId, monthYear: req.params.monthYear, attended: true },
        },
      ],
    });

    return res.status(200).json({ AttendedMembers });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// const get members who did not attend this month
const getMonthlyAbsentMembers = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const monthYear = req.params.monthYear;

    // find the organisation
    const organisation = await Organisation.findByPk(orgId);

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation Not Found" });
    }

    // get all members who attended in a specified month
    const attendedMembers = await Member.findAll({
      include: [
        {
          model: Attendance,
          where: { orgId, monthYear: monthYear },
        },
      ],
    });

    // all members in this club
    const allMembers = await Member.findAll({
      where: { orgId: orgId },
      include: [{ model: Attendance }],
    });

    // find all members who attended who never attended this month
    const absentMembersInMonth = allMembers.filter((member) => {
      return !attendedMembers.some(
        (attendedMember) => attendedMember.id === member.id
      );
    });

    return res.status(200).json({ absentMembersInMonth });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get people who attended this org on a date
const getOrgAttendanceByDate = async (req, res) => {
  try {
    const { orgId, attendanceDate } = req.params;

    const member = await Member.findAll({
      include: [
        { model: Attendance, where: { orgId, attendanceDate, attended: true } },
      ],
    });

    if (!member) {
      return res.status(404).json("Member Not found");
    }

    return res.status(200).json({ member });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// get people who never attended this org on a date
const getOrgMembersNotAttended = async (req, res) => {
  try {
    const orgId = req.params.orgId;

    const member = await Member.findAll({
      include: [
        {
          model: Attendance,
          where: { orgId, attendanceDate: "", attended: false },
        },
      ],
    });

    if (!member) {
      return res.status(404).json("Member Not found");
    }

    return res.status(200).json({ member });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// update organisation
const updateOrganisation = async (req, res) => {
  try {
    const { id } = req.params.id;

    const [updatedOrg] = await Organisation.update(req.body, {
      where: { id },
      returning: true,
    });

    if (!updatedOrg) {
      return res.status(404).json({ msg: "Org Not Found" });
    }

    return res.status(200).json({ updatedOrg });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// delete organisation
const deleteOrganisation = async (req, res) => {
  try {
    const { id } = req.params.id;

    const deletedOrg = await Organisation.destroy({ where: { id } });

    if (!deletedOrg) {
      return res.status(404).json({ msg: "Org Not Found" });
    }

    return res.status(200).json({ deletedOrg });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getAllOrgs,
  getOrgAttendanceByDate,
  getOrgById,
  getOrgByName,
  getOrgMembersNotAttended,
  getOrgMonthlyAttendance,
  createOrg,
  deleteOrganisation,
  updateOrganisation,
  getMonthlyAbsentMembers,
};
