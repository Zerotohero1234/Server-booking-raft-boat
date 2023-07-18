import express from "express";
import asyncHandler from "express-async-handler";
import Category from "../Models/CategoriesModel.js";
import Room from "../Models/RoomsModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const categoriesRouter = express.Router();

// CREATE CATEGORY --Admin
categoriesRouter.post("/", protect, admin, asyncHandler(async (req, res) => {
    const {name, img} = req.body
      const categoryExist = await Category.findOne({name})
      if (categoryExist) {
        res.status(400);
        throw new Error("ຊື່ປະເພດເຮືອແພນີ້ມີຢູ່ແລ້ວ");
      } else {
        const category = new Category({
          name,
          img,
          user: req.user._id,
        });
        if(category) {
          const createdCategory = await category.save()
          res.status(201).json(createdCategory)
        }
        else{
          res.status(400);
          throw new Error("ຂໍ້ມູນປະເພດເຮືອແພບໍ່ຖືກຕ້ອງ");
        }
      }
}));

// GET ALL CATEGORY
categoriesRouter.get(
    "/",
    asyncHandler(async (req, res) => {
      const categories = await Category.find({});
      res.json(categories);
    })
);

// EDIT CATEGORY --Admin
categoriesRouter.put(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const {name, img} = req.body
      const category = await Category.findById(req.params.id);
      if (category) {
        category.name = name || category.name;
        category.img = img || category.img;
  
        const updatedCategory = await category.save()
        res.json(updatedCategory)
      } else {
        res.status(404);
        throw new Error("ບໍ່ພົບຂໍ້ມູນປະເພດເຮືອແພ")
      }
    })
  );

// DELETE CATEGORY --Admin
categoriesRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      try {
        await Category.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ message: "ຂໍ້ມູນປະເພດເຮືອແພນີ້ຖືກລົບໄປເປັນທີ່ຮຽບຮ້ອຍ" });
      } catch (err) {
        res.status(404);
        throw new Error("ບໍ່ພົບຂໍ້ມູນປະເພດເຮືອແພ");
      }
    })
  );

// GET SINGLE CATEGORY
categoriesRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງປະເພດນີ້")
    }
  })
);

export default categoriesRouter;
