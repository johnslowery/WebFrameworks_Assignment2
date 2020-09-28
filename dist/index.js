"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var userObj_1 = require("./userObj");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get('/', function (req, res, next) {
    res.sendFile(path_1.default.join(process.cwd(), 'views', 'help.html'));
});
app.get('/Users', function (req, res, next) {
    res.json(userObj_1.UserArray);
});
app.post('/User', function (req, res, next) {
    var newUser = new userObj_1.User(req.body.UserID, req.body.FName, req.body.LName, req.body.Email, req.body.Password);
    var comp = 0;
    if (userObj_1.UserArray.length > 0) {
        for (var x = 0; x < userObj_1.UserArray.length; x++) {
            var string1 = newUser.userID;
            var string2 = userObj_1.UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if (comp === 0) {
                break;
            }
            else {
                continue;
            }
        }
        if (comp === 0) {
            res.status(404).send('This User ID is already being used, please try another one');
        }
        else {
            if (newUser.userID === "") {
                res.status(404).send('There must be a User ID, please try again');
            }
            else {
                userObj_1.UserArray.push(newUser);
                res.status(201).send(newUser.userID + " has been added");
            }
        }
    }
    else {
        if (newUser.userID === "") {
            res.status(404).send('There must be a User ID, please try again');
        }
        else {
            userObj_1.UserArray.push(newUser);
            res.status(201).send(newUser.userID + " has been added");
        }
    }
});
app.get('/User/:userID', function (req, res, next) {
    var comp = 0;
    var y = 0;
    if (userObj_1.UserArray.length > 0) {
        for (var x = 0; x < userObj_1.UserArray.length; x++) {
            var string1 = req.params.userID;
            var string2 = userObj_1.UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if (comp === 0) {
                y = x;
                break;
            }
            else {
                continue;
            }
        }
        if (comp === 0) {
            res.status(200).send(userObj_1.UserArray[y]);
        }
        else {
            res.status(404).send('The user you are searching for does not exist');
        }
    }
    else {
        res.status(404).send('The user you are searching for does not exist');
    }
});
app.patch('/User/:userID', function (req, res, next) {
    var comp = 0;
    var y = 0;
    if (userObj_1.UserArray.length > 0) {
        for (var x = 0; x < userObj_1.UserArray.length; x++) {
            var string1 = req.params.userID;
            var string2 = userObj_1.UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if (comp === 0) {
                y = x;
                break;
            }
            else {
                continue;
            }
        }
        if (comp === 0) {
            if (req.body.FName) {
                userObj_1.UserArray[y].fName = req.body.FName;
            }
            if (req.body.LName) {
                userObj_1.UserArray[y].lName = req.body.LName;
            }
            if (req.body.Email) {
                userObj_1.UserArray[y].emailAddress = req.body.Email;
            }
            if (req.body.Password) {
                userObj_1.UserArray[y].password = req.body.Password;
            }
            res.status(200).send(userObj_1.UserArray[y]);
        }
        else {
            res.status(404).send('The user you are trying to patch does not exist');
        }
    }
    else {
        res.status(404).send('The user you are trying to patch does not exist');
    }
});
app.delete('/User/:userID', function (req, res, next) {
    var comp = 0;
    var y = 0;
    if (userObj_1.UserArray.length > 0) {
        for (var x = 0; x < userObj_1.UserArray.length; x++) {
            var string1 = req.params.userID;
            var string2 = userObj_1.UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if (comp === 0) {
                y = x;
                break;
            }
            else {
                continue;
            }
        }
        if (comp === 0) {
            userObj_1.UserArray.splice(y, 1);
            res.json(userObj_1.UserArray);
        }
        else {
            res.status(404).send('The user you are trying to delete does not exist');
        }
    }
    else {
        res.status(404).send('The user you are trying to delete does not exist');
    }
});
app.use('/', function (req, res, next) {
    res.redirect('/');
});
app.listen(3000);
