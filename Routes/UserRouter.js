import express from "express";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const userRouter = express.Router();

// ADMIN GET ALL USER
userRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// UPDATE USER BY ADMIN
userRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງຜູ້ໃຊ້");
    }
  })
);

// DELETE USER BY ADMIN
userRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({
          message: `ທ່ານໄດ້ລົບຂໍ້ມູນຂອງຜູ້ໃຊ້ຊືີ່ ${user.name} ນີ້ຖືກລົບໄປເປັນທີ່ຮຽບຮ້ອຍ`,
        });
    } catch (err) {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງຜູ້ໃຊ້");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

export default userRouter;
