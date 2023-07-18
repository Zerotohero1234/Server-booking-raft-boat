import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/Users.js";
import Room from "./Models/RoomsModel.js";
import rooms from "./data/Rooms.js";
import asyncHandler from "express-async-handler";
import Categories from "./Models/CategoriesModel.js";
import categoriesData from "./data/Categories.js";
import Employee from "./Models/EmployeeModel.js";
import employees from "./data/Employee.js";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    // await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/rooms",
  asyncHandler(async (req, res) => {
    // await Room.remove({});
    const importRooms = await Room.insertMany(rooms);
    res.send({ importRooms });
  })
);

ImportData.post(
  "/categories",
  asyncHandler(async (req, res) => {
    // await Categories.remove({});
    const importCategories = await Categories.insertMany(categoriesData);
    res.send({ importCategories });
  })
);

ImportData.post(
  "/employee",
  asyncHandler(async (req, res) => {
    // await Employee.remove({});
    const importEmployee = await Employee.insertMany(employees);
    res.send({ importEmployee });
  })
);

export default ImportData;
