const express = require('express');
const router = express.Router();
const ctrlAttendance = require('../controllers/attendance');

router
.route('/attendance')
.get(ctrlAttendance.getlist);

router
.route('/attendance/:username/:password')
.get(ctrlAttendance.getUserByName);

router
.route('/attendances/read/:teacherid')
.post(ctrlAttendance.readMessage);

router
.route('/attendances/:id')
.post(ctrlAttendance.saveAttendance);

router
.route('/attendances/teacher/:id')
.post(ctrlAttendance.sendMessage);

router
.route('/attendance/:program')
.get(ctrlAttendance.getStudentListByCourse);

router
.route('/attendance/:id')
.get(ctrlAttendance.getSingleData);
module.exports = router;