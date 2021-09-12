const router =require("express").Router();
let Login = require("../model/Login");

router.route("/loginAdd").post((req,res) => {

    const username = req.body.username;
    const password = req.body.password;
    


    const newLogin = new Login({

        username,
        password

    })

    newLogin.save().then(() =>{//pass the object to database if successful
        res.status(200).send({message:"Admin added"})//from jason format a response sent to front end
    }).catch((err) =>{//error or exception handling
        console.log(err);
        res.status(300).send({status : "Error with insert user",error:err.message});

    })

})

//check the availabilty of user in the data base
router.route("/get/:un/:pass").get(async(req,res) => {

    let UN = req.params.un;//username taken from the frontend login form
    let pass = req.params.pass;//password taken from the frontend login form

    const user = await Login.findOne({username : UN,password:pass})
    .then((user) =>{
        res.status(200).send({status :"User fetched",login:user})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status : "Error with get user", error:err.message});
    })

})






module.exports = router;