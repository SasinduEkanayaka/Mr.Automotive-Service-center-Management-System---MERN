import express from 'express';
import { EmployeeSalary } from '../model/EmployeeSalary.js';
 
const rout = express.Router();

//Add the Employee Salary For System
rout.post('/', async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body.employeeName ||
            !req.body.NIC ||
            !req.body.formDate ||
            !req.body.toDate ||
            !req.body.basicSalary // Added validation for BasicSalary
        ) {
            return res.status(400).send({
                message: "Please fill all the fields",
            });
        }

        console.log(req.body)
        const AddEmployeeSalary = {
            employeeName: req.body.employeeName,
            NIC: req.body.NIC,
            formDate: req.body.formDate,
            toDate: req.body.toDate,
            totalOtHours: req.body.totalOThours,
            totalOtAmount: req.body.totalOTpay,
            basicSalary: req.body.basicSalary,
            totalSalary: req.body.TotalSalary,
        };

        console.log(AddEmployeeSalary)

        const employeeSalary = await EmployeeSalary.create(AddEmployeeSalary);
        return res.status(201).send(employeeSalary);
    } catch (error) {
        console.error('Error adding employee salary:', error); // Log the full error
        res.status(500).send({ message: error.message });
    }
});


//Get all employee Salaryee In Dashbord
rout.get('/', async (req, res) => {
    try {
        const employeeSalary = await EmployeeSalary.find({});
        return res.status(200).json({
            count: employeeSalary.length,
            data: employeeSalary,
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

// Get Employee Salary Details by ID
rout.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employeeSalary = await EmployeeSalary.findById(id);

        if (!employeeSalary) {
            return res.status(404).json({ message: 'EmployeeSalary not found' });
        }

        return res.status(200).json(employeeSalary);
    } catch (error) {
        console.error('Error retrieving employee salary:', error.message);
        res.status(500).send({ message: error.message });
    }
});

//Get Employee Salary Details by ID
rout.put('/:id', async (request, response) => {
    try {
      const {
        NIC,
        employeeName,
        formDate,
        toDate,
        totalOtHours,
        totalOtAmount,
        basicSalary,
        totalSalary
      } = request.body;
  
      if (
        !NIC ||
        !employeeName ||
        !formDate ||
        !toDate ||
        totalOtHours === undefined ||
        totalOtAmount === undefined ||
        basicSalary === undefined ||
        totalSalary === undefined
      ) {
        return response.status(400).send({
          message: 'Send all required fields: EmpID, employeeName, fromDate, toDate, totalOThours, totalOTpay, BasicSalary, TotalSalary',
        });
      }
  
      const { id } = request.params;
  
      const result = await EmployeeSalary.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'EmployeeSalary not found' });
      }
  
      return response.status(200).send({ message: 'EmployeeSalary updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Delete Employee Salary
rout.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await EmployeeSalary.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      return res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

export default rout;