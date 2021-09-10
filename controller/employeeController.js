const router = require("express").Router();
const Employee = require("../model/employeeModel")
const Inquiry = require("../model/inquiryModel")
const Resignation = require("../model/resignationModel");
const { v4: uuidv4 } = require("uuid");

//router for add an employee
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

//router for retrieve and send all the employee records
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
            return res.status(200).send({ status: "Success" });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });

});

//router for update an employee record
router.put("/updateEmployee/:empId", async (req, res) => {
    const empId = req.params.empId;
    console.log("employee idd", empId);
    console.log("payload cameeee", req.body);

    const {
        fName,
        lName,
        email,
        nic,
        designation,
        DOB,
        gender,
        maritalStat,
        currAdd,
        permAdd,
        mobileNo,
        emgContact,
        empPic,
        cv
    } = req.body;

    const employeePayload = {
        fName,
        lName,
        email,
        nic,
        designation,
        DOB,
        gender,
        maritalStat,
        currAdd,
        permAdd,
        mobileNo,
        emgContact,
        empPic,
        cv
    }

    if (empId) {
        const response = await Employee.findOneAndUpdate({ empId: empId }, employeePayload).then(() => {
            return res.status(200).send({ status: "Employee Successfully updated!" });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({ status: "Internal Server Error" });
        })
    }
    return res.status(400).send({ status: "Invalid Request" });

});

//router for search employee records
router.get("/searchEmployees/:input", async (req, res) => {

    const input = req.params.input;

    if (req.query.type == "pastEmp") {
        if (!isNaN(input)) {
            try {
                const response = await Resignation.find({ nic: { $regex: '.*' + input.trim() + '.*', $options: 'i' } });
                console.log("search results", response);
                return res.status(200).send({ status: "Success", data: response });
            } catch (error) {
                console.log("Something went wrong while connecting to DB");
                return { ok: false };
            }
        }
        try {
            const response = await Resignation.find({ fName: { $regex: '.*' + input + '.*', $options: 'i' } });
            console.log("search results", response);
            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log("Something went wrong while connecting to DB");
            return { ok: false };
        }
    }


    if (!isNaN(input)) {
        //     console.log
        try {
            const response = await Employee.find({ nic: { $regex: '.*' + input.trim() + '.*', $options: 'i' } });
            console.log("search results", response);
            return res.status(200).send({ status: "Success", data: response });
        } catch (error) {
            console.log("Something went wrong while connecting to DB");
            return { ok: false };
        }
    }
    try {
        const response = await Employee.find({ fName: { $regex: '.*' + input + '.*', $options: 'i' } });
        console.log("search results", response);
        return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        return { ok: false };
    }

});

//router for add resignation
router.post("/resignation", async (req, res) => {

    const empId = req.body.empId;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const gender = req.body.gender;
    const DOB = req.body.DOB;
    const email = req.body.email;
    const nic = req.body.nic;
    const designation = req.body.designation;
    const mobileNo = Number(req.body.mobileNo)
    const resReason = req.body.reason;


    const newResignation = new Resignation({
        empId,
        fName,
        lName,
        gender,
        DOB,
        email,
        nic,
        designation,
        mobileNo,
        resReason
    })

    console.log(req.body.reason, "<<<<<<<<<<<<<<<< resignationnn");

    try {
        let response = await newResignation.save();
        console.log("doneeeeeeeee>>>>>>>>>>>>", response)
        if (response)
            return res.status(201).send({ message: "newResignation Added" });
    } catch (err) {
        console.log("error while saving");
        return res.status(500).send({ status: "Internal Server Error" });
    }
    return res.status(400).send({ status: "Invalid Request" });
});

//router for retrieve and send all the past employee records
router.get("/pastEmployees", async (req, res) => {

    try {
        const response = await Resignation.find();
        return res.status(200).send({ status: "Success", data: response });
    } catch (error) {
        console.log("Something went wrong while connecting to DB");
        return { ok: false };
    }

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
        return res.status(500).send({ status: "Internal Server Error" });
    }
});



module.exports = router;