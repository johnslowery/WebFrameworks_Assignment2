class User{
    userID: string="";
    fName: string="";
    lName: string="";
    emailAddress: string="";
    password: string="";
    constructor(userID:string, fName:string, lName:string, emailAddress:string, password:string){
        this.userID = userID;
        this.fName = fName;
        this.lName = lName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
}

const UserArray:User[]=[];

export {User}
export{UserArray}