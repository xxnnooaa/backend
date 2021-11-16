var express = require('express')
var router = express.Router()
const EmployeeModel = require('../models/employee')
const mongoose = require('mongoose')

//create api for post data
router.post('/newemployee', async function (req, res, next) {
    try {
        const { empID, name, position, department, company, start_date } = req.body
        let newEmployee = new EmployeeModel({
            empID: empID,
            name: name,
            position: position,
            department: department,
            company: company,
            start_date: start_date
        })
        let employee = await newEmployee.save()
        return res.status(200).send({
            data: employee,
            msg: 'create employee success',
            success: true
        })

    } catch (err) {
        return res.status(400).send({
            msg: 'create employee fail',
            success: false
        })
    }
})

//get all data
router.get('/employeeall', async function (req, res, next) {
    try {
        let employee = await EmployeeModel.find() //select * from employee*/
        return res.status(200).send({
            data: employee,
            msg: 'show employee data success',
            success: true
        })

    } catch (err) {
        return res.status(400).send({
            msg: 'show employee fail',
            success: false
        })
    }
})

//show by id
router.get('/singleemployee/:id', async function (req, res, next) {
    try {
        let id = req.params.id
        let employee = await EmployeeModel.findById(id) //select * from employee*/
        return res.status(200).send({
            data: employee,
            msg: 'show employee data success',
            success: true
        })

    } catch (err) {
        return res.status(400).send({
            msg: 'show employee fail',
            success: false
        })
    }
})

// Update employee data
router.put("/updateemployee/:id", async function (req, res, next) {
    try {
      let id = req.params.id;
      const { empID, name, position, department, company, start_date } = req.body
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
          message: "id Invalid",
          success: false,
          error: ["id is not a ObjectId"],
        });
      }
  
      await EmployeeModel.updateOne(
        { _id: id },
        { $set: { empID: empID,
                  name: name, 
                  position: position, 
                  department: department,
                  company: company,
                  start_date: start_date } }
      );
  
      let employee = await EmployeeModel.findById(id);
      return res.status(200).send({
        data: employee,
        msg: "update data success",
        success: true,
      });
    } catch (error) {
      return res.status(400).send({
        data: "update data failed",
        success: false,
      });
    }
  });

  //delete
router.delete('/deleteemployee/:id', async function (req, res, next) {
    try {
        let id = req.params.id
        await EmployeeModel.deleteOne({ _id: id })
        let employee = await EmployeeModel.find() //find คือการดึงข้อมูลทั้งหมดใน db มาแสดง
        //find แบบมีเงื่อนไข
        return res.status(200).send({
            data: employee,
            msg: 'delete employee success',
            success: true
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            msg: 'delete employee fail',
            success: false
        })
    }
})

module.exports = router
