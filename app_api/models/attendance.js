const mongoose = require('mongoose');

const attendanceSubSchema = new mongoose.Schema({

    year: {
        type: String
    },
    month: {
        type: String
    },
    day: {
        type: String
    },
    record: {
        type: String
    }



});
const attendanceMeetingSubSchema = new mongoose.Schema({
    message: {
        type: String
    },
    studentName: {
        type: String
    },
    day: {
        type: String
    },
    read: {
        type: String
    }
});

const attendanceSchema = new mongoose.Schema({

    username: {
        type: String,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    role: {
        type: String,
    },
    password: {
        type: String
    },
    program: {
        type: String
    },
    attendance: [attendanceSubSchema],
    messages: [attendanceMeetingSubSchema]

});



mongoose.model('attendance', attendanceSchema);
