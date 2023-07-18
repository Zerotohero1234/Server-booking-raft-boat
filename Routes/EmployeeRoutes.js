import express from "express";
import asyncHandler from "express-async-handler";
import Employee from "../Models/EmployeeModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";

const employeeRouter = express.Router();

// SAVE EMPLOYEE
employeeRouter.post(
    "/",
    asyncHandler(async (req, res) => {
      const { name, email, phone, img, position } = req.body;
  
      const employeeExists = await Employee.findOne({ email });
  
      if (employeeExists) {
        res.status(400);
        throw new Error("Employee already exists");
      }
  
      const employee = await Employee.create({
        name,
        email,
        phone,
        img,
        position,
      });
  
      if (employee) {
        res.status(201).json({
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          img: employee.img,
          position: employee.position,
          isAdmin: employee.isAdmin,
          token: generateToken(employee._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid Employee Data");
      }
    })
  );
  

// ADMIN GET ALL Employee
employeeRouter.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const employees = await Employee.find({});
      res.json(employees);
    })
  );
  
  // UPDATE Employee BY ADMIN
  employeeRouter.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const { name, email, phone, img, position } = req.body;
      const employee = await Employee.findById(req.params.id);
      if (employee) {
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;
        employee.img = img || employee.img;
        employee.position = position || employee.position;
        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
      } else {
        res.status(404);
        throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງພະນັກງານ");
      }
    })
  );
  
  // DELETE Employee BY ADMIN
  employeeRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({
            message: `ທ່ານໄດ້ລົບຂໍ້ມູນຂອງພະນັກງານທີ່ຊືີ່ ${employee.name} ນີ້ຖືກລົບໄປເປັນທີ່ຮຽບຮ້ອຍ`,
          });
      } catch (err) {
        res.status(404);
        throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງພະນັກງານ");
      }
    })
  );
  
  // PROFILE
  employeeRouter.get(
    "/:id",
    asyncHandler(async (req, res) => { 
      const employee = await Employee.findById(req.params.id);
  
      if (employee) {
        res.json({
          _id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          img : employee.img,
          position: employee.position,
          isAdmin: employee.isAdmin,
        });
      } else {
        res.status(404);
        throw new Error("Employee not found");
      }
    })
  );
  

export default employeeRouter;