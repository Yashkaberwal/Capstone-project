const request = require('request');
var express = require('express');
var router = express.Router();
const apiOptions = {
    server: 'http://localhost:3000'
};

const _renderStudentPage = function (req, res, responseBody) {
    console.log(responseBody)
    res.render('student-list', {
        studentslist: responseBody
    });
};

const _renderStudentDetailPage = function (req, res, responseBody) {
    res.render('student-detail', {
        studentDetail: responseBody
    });
};

const _renderTeacherAttendancePage = function (req, res, responseBody) {
    console.log(res);
    console.log(req);
    console.log("testing return");
    console.log(responseBody);

    if (req.session.test == null) {
        res.render('login', {
            title: 'Login Expired',
            sessionval: "empty"
        });
    }
   // res.redirect('/teacher');
    res.render('teacher', {
        teacherStudentList: responseBody,
        teacherDetail: req.session.test,
        sessionval: "emptys"
    });
};

const ProgramStudentListDetail = function (req, res) {
    const path = `/api/attendance/${req.params.program}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    console.log("requestOptions");
    request(requestOptions, (err, response, body) => {

        _renderTeacherAttendancePage(req, res, body);

    });
};

//const ProgramStudentListDetail2 = function (req, res) {
//    const path = `/api/attendance/web security`;
//    const requestOptions = {
//        url: apiOptions.server + path,
//        method: 'GET',
//        json: {}
//    };
//    console.log(requestOptions);
//    request(requestOptions, (err, response, body) => {
//        _renderTeacherAttendancePage(req, res, body);
//
//    });
//};


const sendMessage = function (req, res) {

    const path = `/api/attendances/teacher/5e406c7e1c9d440000161db2`;
    const postdata = {
        message: req.body.message,
        studentname: req.body.username
    };

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    console.log(requestOptions);
    request(
        requestOptions,
        (err, response, body) => {
            res.redirect('/student');
        }
    );

};


const readMessage = function (req, res) {

    const path = `/api/attendances/read/${req.params.teacherid}`;
    const postdata = {
        teacherid: req.params.teacherid,
        meetingid: req.params.meetingid
    };


    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata

    };
    console.log(requestOptions);
    request(
        requestOptions,
        (err, response, body) => {
            res.redirect('/teacher');
        }
    );

};

const saveStudentAttendance = function (req, res) {

    const path = `/api/attendances/${req.params.id}`;
    const postdata = {
        record: req.body.attendance,
        year: req.body.date,
        month: req.body.date,
        day: req.body.date
    };

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {

            res.redirect('/teacher');
        }
    );

};









const studentList = function (req, res) {
    const path = '/api/attendance';
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {

        _renderStudentPage(req, res, body);

    });
};


const recordDetail = function (req, res) {
    const path = `/api/attendance/${req.params.id}`;
    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {

        _renderStudentDetailPage(req, res, body);

    });
};

module.exports = {
    recordDetail,
    studentList,
    ProgramStudentListDetail,
    saveStudentAttendance,
    sendMessage,
    readMessage
};
