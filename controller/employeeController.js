const router = require("express").Router();
const Employee = require("../model/employeeModel")
const Inquiry = require("../model/inquiryModel")
const { v4: uuidv4 } = require("uuid");
const { findOneAndDelete } = require("../model/employeeModel");

router.post("/employee", async (req, res) => {

    const empId = uuidv4();
    const fName = req.body.fName;
    const lName = req.body.lName;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const email = req.body.email;
    const maritalStat = req.body.maritalStat;
    const nic = req.body.nic;
    const designation = req.body.designation;
    const currAdd = req.body.currAdd;
    const permAdd = req.body.permAdd;
    const mobileNo = Number(req.body.mobileNo)
    const emgContact = Number(req.body.emgContact);
    const empPic = req.body.empPic;
    const cv = req.body.cv;


    const newEmployee = new Employee({
        empId,
        fName,
        lName,
        gender,
        DOB,
        email,
        maritalStat,
        nic,
        designation,
        currAdd,
        permAdd,
        mobileNo,
        emgContact,
        empPic,
        cv
    })


    try {
        Employee.find({ nic: newEmployee.nic }, async (err, doc) => {
            if (Object.keys(doc).length == 0) {

                try {
                    let response = await newEmployee.save();
                    if (response)
                        //console.log(doc);
                        return res.status(201).send({ message: "newEmployee Added" });
                } catch (err) {
                    //console.log("error while saving");
                    return res.status(500).send({ status: "Internal Server Error" });
                }
            }
            else {
                //console.log("nic found")
                return res.status(400).send({ status: "User already exist!" });
            }
        });
    } catch (err) {
        console.log("error", err)
    }
});


router.get("/employee", async (req, res) => {

    try {
        const response = await Employee.find();
        return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        return { ok: false };
    }

});

//router for delete an employee record
router.post("/removeEmployee", async (req, res) => {
    const employeeId = req.body.empId;

    console.log(employeeId, "<<<<<<<<<<<<<<<<deleteeeeeeee");

    if (employeeId) {
        const response = await Employee.findOneAndDelete({ empId: employeeId }).then(() => {
            return res.status(200).send({
                status: response.status ? response.status : "Success",
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });
});

//route for add inquiry
router.post("/inquiry", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const reason = req.body.reason;
    const description = req.body.description;

    console.log("request came", req.body);

    const newInquiry = new Inquiry({
        name,
        reason,
        email,
        description
    });

    try {
        let response = await newInquiry.save();
        if (response)
            console.log(response);
        return res.status(201).send({ message: "new Inquiry Added" });
    } catch (err) {
        //console.log("error while saving");
        return res.status(500).send({ status: "Internal Server Error" });
    }
});



module.exports = router;