const memberController = require("../controller/memberController");
const orgController = require("../controller/orgController");
const contactsController = require("../controller/contactController");
const attendanceController = require("../controller/attendanceController");

// get router
const router = require("express").Router();

// member controller
router.get("/members", memberController.getAllMembers);
router.get("/member/:id", memberController.getMemberById);
router.get("/member/name/:name", memberController.getMemberByName);
router.get("/member/location/:location", memberController.getMemberByLocation);
router.get("/member/hometown/:hometown", memberController.getMemberByHometown);
router.post("/member", memberController.createMember);
router.put("/member/:id", memberController.updateMember);
router.delete("/member/:id", memberController.deleteMember);
router.get(
  "/member/year/:yearOfStudy",
  memberController.getMemberByYearOfStudy
);

// contact routes
router.post("/contact", contactsController.createContacts);
router.post("/contacts/:name", contactsController.createContactsByName);
router.get("/contacts", contactsController.getAllContacts);
router.get("/contact/:id", contactsController.getContactsbyId);
router.put("/contact/:memberId", contactsController.updateMemberContacts);
router.delete("/contact/:id", contactsController.deleteContacts);

// attendance routes
router.post("/attendance/:name", attendanceController.createAttendance);
router.get("/attendances", attendanceController.getAllAttendances);
router.get("/attendance/:id", attendanceController.getAttendanceById);
router.delete("/attendance/:id", attendanceController.deleteAttendance);
router.put(
  "/attendance/:memberId",
  attendanceController.updateMemberAttendance
);

// org routes
router.post("/org", orgController.createOrg);
router.get("/org/:id", orgController.getOrgById);
router.get("/orgs", orgController.getAllOrgs);
router.get("/org/orgName/:orgName", orgController.getOrgByName);
router.put("/org/:id", orgController.updateOrganisation);
router.delete("/org/:id", orgController.deleteOrganisation);
router.get(
  "/org/monthly/present/:orgId/:monthYear",
  orgController.getOrgMonthlyAttendance
);
router.get(
  "/org/monthly/absent/:orgId/:monthYear",
  orgController.getMonthlyAbsentMembers
);
router.get(
  "/org/date/present/:orgId/:attendanceDate",
  orgController.getOrgAttendanceByDate
);
router.get(
  "/org/date/absent/:orgId/:attendanceDate",
  orgController.getOrgMembersNotAttended
);

module.exports = router;
