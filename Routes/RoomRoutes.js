import express from "express";
import asyncHandler from "express-async-handler";
import Room from "../Models/RoomsModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import ApiFeatures from "../utils/apifeatures.js";

const roomRoute = express.Router();

//CREATE ROOM --Admin
roomRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    // const newRoom = new Rooms(req.body)
    const { name, image, type, title, desc, price,maxPeople, numberOfRooms, availableRooms, featured } =
      req.body;
    const roomExist = await Room.findOne({ name });
    if (roomExist) {
      res.status(400);
      throw new Error("ຊື່ຂອງເຮືອແພຫຼັງນີ້ຢູ່ມີແລ້ວ");
    } else {
      const newRoom = new Room({
        name,
        image,
        type,
        title,
        desc,
        price,
        maxPeople,
        numberOfRooms,
        availableRooms,
        featured,
        user: req.user._id,
      });
      if (newRoom) {
        const createRoom = await newRoom.save();
        res.status(201).json(createRoom);
      } else {
        res.status(404);
        throw new Error("ຂໍ້ມູນຂອງເຮືອແພບໍ່ຖືກຕ້ອງ");
      }
    }
  })
);

//UPDATE ROOMS --Admin
roomRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, image, type, title, desc, price, numberOfRooms,availableRooms, featured } =
      req.body;
    const room = await Room.findById(req.params.id);
    if (room) {
      room.name = name || room.name;
      room.image = image || room.image;
      room.type = type || room.type;
      room.title = title || room.title;
      room.desc = desc || room.desc;
      room.price = price || room.price;
      room.numberOfRooms = numberOfRooms || room.numberOfRooms;
      room.availableRooms = availableRooms || room.availableRooms;
      room.featured = featured || room.featured;

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນເຮືອແພ");
    }
  })
);

// DELETE ROOMS --Admin
roomRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "ຂໍ້ມູນເຮືອແພນີ້ຖືກລົບໄປເປັນທີ່ຮຽບຮ້ອຍ" });
    } catch (err) {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນເຮືອແພ");
    }
  })
);

// GET SINGLE ROOMS
roomRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງເຮືອແພ");
    }
  })
);

// GET ALL ROOM
roomRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const resultPerPage = 9;
    const roomsCount = await Room.countDocuments();

    const apiFeature = new ApiFeatures(Room.find(), req.query)
      .search()
      .filter();

    let rooms = await apiFeature.query;

    let filteredRoomsCount = rooms.length;

    apiFeature.pagination(resultPerPage);

    rooms = await apiFeature.query.clone();

    res.status(200).json({
      success: true,
      rooms,
      roomsCount,
      resultPerPage,
      filteredRoomsCount,
    });
  })
);

// GET Featured ROOM
roomRoute.get(
  "/get/featured",
  asyncHandler(async (req, res) => {
    const resultPerPage = 40;
    const roomsCount = await Room.countDocuments();

    const apiFeature = new ApiFeatures(Room.find(), req.query)
      .filter();

    let rooms = await apiFeature.query;

    let filteredRoomsCount = rooms.length;

    apiFeature.pagination(resultPerPage);

    rooms = await apiFeature.query.clone();

    res.status(200).json({
      success: true,
      rooms,
      roomsCount,
      resultPerPage,
      filteredRoomsCount,
    });
  })
);

// ADMIN GET ALL ROOM WITHOUT SEARCH AND PEGINATION
roomRoute.get(
  "/all/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const rooms = await Room.find({}).sort({_id:-1})
    res.json(rooms)
})
);

export default roomRoute;
