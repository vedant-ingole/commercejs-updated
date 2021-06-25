const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
// const cookieParser = require('cookie-parser');

// router.use(cookieParser);

require('../db/conn');
const User = require('../model/userSchema'); 

router.get('/', (req, res) => {
    res.send('Hello Home From ROUTER');
})




// Using PROMISES.
// router.post('/register', (req, res) => {
    
//     const {name, email, phone, work, password, cpassword} = req.body;

//    if(!name || !email || !phone || !work || !password || !cpassword){
//         return  res.status(422).json({error: "Please fill all data"})
//     }

//     User.findOne({email:email})
//         .then((userExists) => {
//               if(userExists) {
//                   return res.send.status(422).json({error: "Email alredy exists"});
//               }

//               const user = new User({name, email ,phone, work, password, cpassword }); 

//               user.save().then(() => {
//                   res.status(201).json({message: "Registration successful"})
//               }).catch((e) => res.status(500).json({error:"Failed Registration"}))
//         }
//         ).catch(e => console.log(e));
// })

// USING ASYNC AWAIT.
router.post('/register', async (req, res) => {
    
    const {name, email, phone, work, password, cpassword} = req.body;

   if(!name || !email || !phone || !work || !password || !cpassword){
        return  res.status(422).json({error: "Please fill all data"})
    }

    try {     
        const userExists = await User.findOne({email:email})

        if(userExists) {
            return res.status(422).json({error: "Email alredy exists"});
        } else if (password != cpassword){
            return res.status(422).json({error: "Password does no match"});   
        } else {

            const user = new User({name, email ,phone, work, password, cpassword }); 

            //Before saving data-- #HASHING# /cpassword
            //pre save methods
            //THIS IS A MIDDLEWARE.

            const userRegister = await user.save();

            // console.log(`${user} regiter succes`);
            // console.log(userRegister);
            
            return res.status(201).json({message: "Registration successful"});
            
            // const userRegister = await user.save();
            // if(userRegister) {
            //     return res.status(201).json({message: "Registration successful"});
            // } else{
            //     res.status(500).json({error:"Failed Registration"})
            // }
     }

    } catch (error) {
        console.log(error);
    }
});



//LOGIN ROUTE

router.post('/signin', async (req, res) => {
 
    try {
        let token;
        const {email, password} = req.body;
        
        if(!email || !password ){
            return res.status(400).json({error: "No Data"})
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin);

        if(userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password);

        token = await userLogin.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires:new Date(Date.now() + 25892000000 ),
            httpOnly:true
        });

        if(!isMatch){
            res.status(400).json({message: "Invalid Credinitials pass"})

        } else { 
            res.json({message: "User Logged in Successfully"})
    }
    } else{
        res.status(400).json({message: "Invalid Credinitials email"})
    }
        
    } catch (error) {
        console.log(error);
    }
})


//about us ka page
router.get('/about', authenticate, (req, res) => {
        console.log("Hello About here!");
        res.send(req.rootUser); 
    })



// get user Data for Contact and Home page    
router.get('/getdata', authenticate, (req, res) => {
    console.log("Hello About here!");
    res.send(req.rootUser); 
})    



// Contact us page (message).
router.post('/contact', authenticate, async (req, res) => {
    
    try {
        const {name, email, phone, message} = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.status(422).json({error: 'Please fill the contact form'});
        }

        const userContact = await User.findOne({_id: req.userID});

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
        
            // await userContact.save();

            return res.status(201).json({message : "User Contact deatils saved."});
        }
        
    } catch (error) {
        console.log(error);
    }
})



//logout route
router.get('/logout', (req, res) => {
    console.log("Hello Logout Page here!");
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('User logout.'); 
})




module.exports = router;