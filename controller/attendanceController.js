const entities = require("../model");

const Attendance = entities.attendance;
const Member = entities.member;
const Organisation = entities.organisation;

//create attendance for a member
const createAttendance = async (req, res) => {
  try {
    // try to get a member by name
    const memberName = req.params.name;

    // find a member by name
    const member = await Member.findOne({
      where: { name: memberName },
    });

    if (!member) {
      return res.status(404).json({ msg: "Member not found" });
    }

    // extract an id and orgId from member
    const memberId = member.id;
    const orgId = member.orgId;

    // find an organisation
    const organisation = await Organisation.findByPk(orgId);

    if (!organisation) {
      return res.status(404).json({ msg: "Organisation not found" });
    }

    // set attendance
    const attendance = await Attendance.create({
      memberId: memberId,
      orgId: orgId,
      attended: false,

      attendanceDate: req.body.attendanceDate,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,

      monthYear: req.body.month + "-" + req.body.year,
    });

    return res.status(201).json({ attendance });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// get attendance by Id
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id);

    if (!attendance) {
      return res.status(404).json({ error: " Attendance Not found" });
    }

    return res.status(200).json({ attendance });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get all attendees
const getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();

    return res.status(200).json({ attendances });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// update attendance of a member
const updateMemberAttendance = async (req, res) => {
  try {
    // find the attendance record you want to update
    const attendance = await Attendance.findOne({
      where: {
        memberId: req.params.memberId,
      },
    });

    if (!attendance) {
      return res.status(404).json({ msg: "Attendance not found" });
    }

    // make the update
    const updatedMemberAttendance = await attendance.update({
      attended: req.body.attended,
    });

    return res.status(200).json({ updatedMemberAttendance });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAttendance = await Attendance.destroy({ where: { id } });

    if (!deletedAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    return res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateMemberAttendance,
  deleteAttendance,
};
