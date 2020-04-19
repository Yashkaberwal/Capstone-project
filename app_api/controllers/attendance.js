const mongoose = require('mongoose');
const attendance = mongoose.model('attendance');

const getlist = function (req, res) {
    attendance.find()
        .exec(function (err, data) {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(data);
        });

};

const getStudentListByCourse = function (req, res) {
    attendance.find({
            program: req.params.program
        }, function (err, data) {
            console.log(data);
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "Not Found"
                    });

            } else if (err) {
                res
                    .status(404)
                    .json(err);

            } else {
                res
                    .status(200)
                    .json(data);
            }
        }

    );
};


const sendMessage = function (req, res) {
    attendance
        .findById(req.params.id)
        .exec((err, data) => {
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "This id is not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            } else {
                console.log("helotest");
                console.log(req.params.id);
                console.log(req.body.message);
                console.log(req.body.studentname);
                console.log(new Date());

                attendance.updateOne({
                        "_id": req.params.id
                    }, {
                        "$push": {
                            "messages": [{
                                "message": req.body.message,
                                "studentName": req.body.studentname,
                                "day": new Date()
                                                        }]
                        }
                    },
                    function (request, error) {
                        console.log("done");
                    }

                )

            }
            res
                .status(200)
                .json("message send");
            return;
        });
}



const readMessage = function (req, res) {

    attendance
        .findById(req.body.teacherid)
        .exec((err, data) => {
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "This id is not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            } else {
console.log(req.body.meetingid);
                attendance.updateOne({
//                        "_id": req.body.teachingid,
                        "messages._id": req.body.meetingid
                    }, {
                        "$set": {
                            "messages.$.read":"y"
                                                        }
                        }
                    ,
                    function (request, error) {
                        console.log("done");
                    }

                )

            }
            res
                .status(200)
                .json("message send");
            return;
        });
}



const saveAttendance = function (req, res) {

    if (!req.params.id) {
        res
            .status(404)
            .json({
                "message": "No id is passed!"
            });
        return;

    };
    attendance
        .findById(req.params.id)
        .exec((err, data) => {
            if (!data) {
                res
                    .status(404)
                    .json({
                        "message": "This id is not found"
                    });
                return;
            } else if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            } else {
                var result = (req.body.month).split("-");
                data.record = req.body.record,
                    data.month = result[1],
                    data.year = result[0],
                    data.day = result[2]


                attendance.updateOne({
                        "_id": req.params.id
                    }, {
                        "$push": {
                            "attendance": [{
                                "record": data.record,
                                "day": data.day,
                                "month": data.month,
                                "year": data.year
                            }]
                        }
                    },
                    function (request, error) {
                        console.log("done");
                    }
                )
            }
            res
                .status(404)
                .json(err);
            return;
        });
};

const getSingleData = function (req, res) {

    if (req.params && req.params.id) {
        attendance
            .findById(req.params.id)
            .exec(function (err, data) {
                if (!data) {
                    res
                        .status(404)
                        .json({
                            "message": "id Not Found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(data);
            });
    }

};




const getUserByName = function (req, res) {

    attendance.findOne({
        username: req.params.username
    }, function (err, data) {
        console.log(data);
        if (!data) {
            res
                .status(404)
                .json({
                    "message": "Not Found"
                });

        } else if (err) {
            res
                .status(404)
                .json(err);

        } else {
            if (data.password == req.params.password) {
                res
                    .status(200)
                    .json(data);
            } else {
                res
                    .status(404)
                    .json({
                        "message": "Password not matched"
                    });

            }
        }

    });

};





module.exports = {
    getSingleData,
    getlist,
    getUserByName,
    getStudentListByCourse,
    saveAttendance,
    sendMessage,
    readMessage
};
