var express = require('express');
var router = express.Router();


const ctrlAbout = require('../controller/about');
const ctrlLogin = require('../controller/login');
const ctrlLoginCheck = require('../controller/loginCheck');
const ctrlAttendance = require('../controller/attendance');
/* GET home page. */



router.get('/about', ctrlAbout.about);
router.get('/', ctrlAbout.home);


router.get('/teacher',ctrlLogin.teacher);
router.get('/student',ctrlLogin.student);
router.get('/login', ctrlLogin.login);
router.get('/logout', ctrlLogin.loginout);

router.route('/login')
.post(ctrlLogin.findUser);


router.post('/saveMessage',ctrlAttendance.sendMessage);
router.post('/Done/:teacherid/:meetingid',ctrlAttendance.readMessage);
router.get('/studentList', ctrlAttendance.studentList);
router.post('/saveStudentAttendance/:id', ctrlAttendance.saveStudentAttendance);
router.get('/studentDetail/:id', ctrlAttendance.recordDetail);
router.get('/studentprogramlist/:program', ctrlAttendance.ProgramStudentListDetail);
module.exports = router;


