const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};


const _renderStudentDetailPage = function (req, res, responseBody) {
    if (responseBody.role == "student") {
        console.log("hello");
        req.session = responseBody;
        
        res.render('student-detail', {
            studentDetail: responseBody
        });
    } if (responseBody.role == "teacher") {
        console.log("hwwwello");
        req.session.test = responseBody;
        console.log(req.session.test);
        res.render('teacher', {
            title:'Teacher Login',teacherDetail:req.session.test,sessionval:req.session.test
        });
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
            res.render('login',{title:'Password not matched'});
        } else if (response.status=="Not Found")
            {
            res.render('login',{title:'not found'});
            }
        else {
            _renderStudentDetailPage(req, res, body);
        }
    

    });

};


module.exports = {
    findUser
};
