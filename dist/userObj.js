"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserArray = exports.User = void 0;
var User = /** @class */ (function () {
    function User(userID, fName, lName, emailAddress, password) {
        this.userID = "";
        this.fName = "";
        this.lName = "";
        this.emailAddress = "";
        this.password = "";
        this.userID = userID;
        this.fName = fName;
        this.lName = lName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    return User;
}());
exports.User = User;
var UserArray = [];
exports.UserArray = UserArray;
