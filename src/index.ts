import express from 'express';
import bodyparser from 'body-parser';
import path from 'path';
import { User, UserArray } from './userObj';


let app = express();

app.use(bodyparser.urlencoded({extended : false}));

app.get('/', (req, res, next)=>{
    res.sendFile(path.join(process.cwd(),'views','help.html'));
});

app.get('/Users', (req, res, next)=>{
    res.json(UserArray);
});

app.post('/User', (req, res, next)=>{
    let newUser = new User(req.body.UserID, req.body.FName, req.body.LName, req.body.Email, req.body.Password);
    let comp = 0;
    if(UserArray.length > 0){
        for(let x = 0; x < UserArray.length; x++){
            var string1 = newUser.userID;
            var string2 = UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if(comp === 0){
                break;
            }else{
                continue;
            }
        }
        if(comp === 0){
            res.status(404).send('This User ID is already being used, please try another one');
        }else{
            if(newUser.userID === ""){
                res.status(404).send('There must be a User ID, please try again');
            }else{
                UserArray.push(newUser);
                res.status(201).send(`${newUser.userID} has been added`);
            }
        }
    }else{
        if(newUser.userID === ""){
            res.status(404).send('There must be a User ID, please try again');
        }else{
            UserArray.push(newUser);
            res.status(201).send(`${newUser.userID} has been added`);
        }
    }
});

app.get('/User/:userID', (req, res, next)=>{
    let comp = 0;
    let y = 0;
    if(UserArray.length > 0){
        for(let x = 0; x < UserArray.length; x++){
            var string1 = req.params.userID;
            var string2 = UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if(comp === 0){
                y = x;
                break;
            }else{
                continue;
            }
        }
        if(comp === 0){
            res.status(200).send(UserArray[y]);
        }else{
            res.status(404).send('The user you are searching for does not exist');
        }
    }else{
        res.status(404).send('The user you are searching for does not exist');
    }
});

app.patch('/User/:userID', (req, res, next)=>{
    let comp = 0;
    let y = 0;
    if(UserArray.length > 0){
        for(let x = 0; x < UserArray.length; x++){
            var string1 = req.params.userID;
            var string2 = UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if(comp === 0){
                y = x;
                break;
            }else{
                continue;
            }
        }
        if(comp === 0){
            if(req.body.FName){
                UserArray[y].fName = req.body.FName;
            }
            if(req.body.LName){
                UserArray[y].lName = req.body.LName;
            }
            if(req.body.Email){
                UserArray[y].emailAddress = req.body.Email;
            }
            if(req.body.Password){
                UserArray[y].password = req.body.Password;
            }
            res.status(200).send(UserArray[y]);
        }else{
            res.status(404).send('The user you are trying to patch does not exist');
        }
    }else{
        res.status(404).send('The user you are trying to patch does not exist');
    }
});

app.delete('/User/:userID', (req, res, next)=>{
    let comp = 0;
    let y = 0;
    if(UserArray.length > 0){
        for(let x = 0; x < UserArray.length; x++){
            var string1 = req.params.userID;
            var string2 = UserArray[x].userID;
            comp = string1.localeCompare(string2);
            if(comp === 0){
                y = x;
                break;
            }else{
                continue;
            }
        }
        if(comp === 0){
            UserArray.splice(y, 1);
            res.json(UserArray);
        }else{
            res.status(404).send('The user you are trying to delete does not exist');
        }
    }else{
        res.status(404).send('The user you are trying to delete does not exist');
    }
});

app.use('/',(req,res,next)=>
{
    res.redirect('/');
});

app.listen(3000);