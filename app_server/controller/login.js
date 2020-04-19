const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};
const login = function (req, res) {
    req.session.test = "empty";
    res.render('login', {
        title: 'Login',
        sessionval: req.session.test
    });
};

//module.exports={
//    login
//};
const loginout = function (req, res) {
    // req.session.test="empty";
    req.session.test = null;

    res.redirect('/login');
//    res.render('login', {
//        title: 'Login',
//        sessionval: "empty"
//    });
};

//module.exports={
//    login
//};
const teacher = function (req, res) {
    if (req.session && req.session.test) {
        console.log("h");
        res.render('teacher', {
            title: 'Teacher Login',
            teacherDetail: req.session.test,
            sessionval: "emptys"
        });
    } else {
        console.log("ghgh");
        res.redirect('/login');
    }

}

const student = function (req, res) {
    if (req.session && req.session.test) {
        res.render('student', {
            studentDetail: req.session.test,
            sessionval: "emptys"
        });
    }
    else {
        console.log("ghgh");
        res.redirect('/login');
    }
}




const _renderStudentDetailPage = function (req, res, responseBody) {
    if (responseBody.role == "student") {
        if (req.session.test == null) {
            res.render('login', {
                title: 'Login Expired',
                sessionval: "empty"
            });
        }
         req.session.test = responseBody;
        res.redirect('/student');
        console.log("hhhhhhhh");
       
        //        res.render('student', {
        //            studentDetail: responseBody,sessionval:"emptys"
        //        });
    }
    if (responseBody.role == "teacher") {
        req.session.test = responseBody;
        if (req.session.test == null) {
            res.render('login', {
                title: 'Login Expired',
                sessionval: "empty"
            });
        }
        res.redirect('/teacher');
        //        res.render('teacher', {
        //            title:'Teacher Login',teacherDetail:req.session.test,sessionval:"emptys"
        //        });
    }
};
//add catch , flush , session


const findUser = function (req, res) {

    const path = `/api/attendance/${req.body.username}/${req.body.password}`;


    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };
    request(requestOptions, (err, response, body) => {
        console.log(body);
        if (body.message == "Password not matched") {
            res.render('login', {
                title: 'Password not matched',message:"Password not matched"
            });
        } else if (body.message == "Not Found") {
            console.log("hgrgwerjyewrtr");
            req.session.test = "empty";
            res.render('login', {
                title: 'not found',
                sessionval: "empty",message:"User not found"
            });
        } else {
            _renderStudentDetailPage(req, res, body);
        }


    });

};


module.exports = {
    findUser,
    login,
    loginout,
    teacher,student
};
