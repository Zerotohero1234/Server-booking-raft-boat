import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Book from "../Models/BookingModel.js";
import Room from "../Models/RoomsModel.js";
import User from "../Models/UserModel.js";
import moment from "moment";

const bookRouter = express.Router();

// bookRouter.post('/', async (req, res) => {
//     try {
//       const { checkInDate, checkOutDate, qtyRoom, userId, bookItems } = req.body;

//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).send('User not found.');
//       }

//       const roomIds = bookItems.map(item => item.room);
//       const rooms = await Room.find({ _id: { $in: roomIds } });
//       if (rooms.length !== roomIds.length) {
//         return res.status(404).send('One or more rooms not found.');
//       }

//       for (let i = 0; i < bookItems.length; i++) {
//         const item = bookItems[i];
//         const room = rooms.find(r => r._id.equals(item.room));
//         if (room.availableRooms < item.qty) {
//           return res.status(409).send(`Room ${room.name} is not available.`);
//         }
//       }

//       const bookings = await Book.find({
//         $and: [
//           {
//             $or: [
//               { checkInDate: { $gte: checkInDate, $lte: checkOutDate } },
//               { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } }
//             ]
//           },
//           { "bookItems.room": { $in: roomIds } }
//         ]
//       });

//       for (let i = 0; i < bookItems.length; i++) {
//         const item = bookItems[i];
//         const bookedRooms = bookings.reduce((total, booking) => {
//           const bookItem = booking.bookItems.find(bi => bi.room.equals(item.room));
//           return total + (bookItem ? bookItem.qty : 0);
//         }, 0);
//         const room = rooms.find(r => r._id.equals(item.room));
//         if (bookedRooms + item.qty > room.availableRooms) {
//           return res.status(409).send(`Not enough rooms available for ${room.name} on the requested dates.`);
//         }
//       }

//       const totalPrice = bookItems.reduce((total, item) => {
//         const room = rooms.find(r => r._id.equals(item.room));
//         return total + (room.price * item.qty);
//       }, 0);

//       // Update availableRooms for each booked room
//       for (let i = 0; i < bookItems.length; i++) {
//         const item = bookItems[i];
//         const room = rooms.find(r => r._id.equals(item.room));
//         const bookedRooms = bookings.reduce((total, booking) => {
//           const bookItem = booking.bookItems.find(bi => bi.room.equals(item.room));
//           return total + (bookItem ? bookItem.qty : 0);
//         }, 0);
//         room.availableRooms -= item.qty;
//         await room.save();
//       }

//       const booking = new Book({ checkInDate, checkOutDate, qtyRoom, user: userId, bookItems, price: totalPrice });
//       await booking.save();

//       return res.status(201).send(booking);
//     } catch (error) {
//       return res.status(500).send(error.message);
//     }
//   });

bookRouter.delete("/bookings/:id", async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Book.findById(bookingId);
    if (!booking) {
      return res.status(404).send("Booking not found.");
    }

    // Update availableRooms for each cancelled room
    const bookItems = booking.bookItems;
    for (let i = 0; i < bookItems.length; i++) {
      const item = bookItems[i];
      const room = await Room.findById(item.room);
      room.availableRooms += item.qty;
      await room.save();
    }

    await booking.remove();

    return res.send("Booking cancelled.");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// DELETE BOOKING BY ADMIN
bookRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: `ທ່ານໄດ້ລົບຂໍ້ມູນການຂອງນີ້ເປັນທີ່ຮຽບຮ້ອຍ`,
      });
    } catch (err) {
      res.status(404);
      throw new Error("ບໍ່ພົບຂໍ້ມູນຂອງການຈອງ");
    }
  })
);

// bookRouter.post('/', async (req, res) => {
//     try {
//         const { checkInDate, checkOutDate, qtyRoom, userId, bookItems } = req.body;

//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send('User not found.');
//         }

//         const roomIds = bookItems.map(item => item.room);
//         const rooms = await Room.find({ _id: { $in: roomIds } });
//         if (rooms.length !== roomIds.length) {
//             return res.status(404).send('One or more rooms not found.');
//         }

//         for (let i = 0; i < bookItems.length; i++) {
//             const item = bookItems[i];
//             const room = rooms.find(r => r._id.equals(item.room));
//             if (room.numberOfRooms <= item.qtyRoom) {
//                 return res.status(409).send(`Room ${room.name} is not available.`);
//             }
//         }

//         const bookings = await Book.find({
//             $and: [
//                 {
//                     $or: [
//                         { checkInDate: { $gte: checkInDate, $lte: checkOutDate } },
//                         { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } }
//                     ]
//                 },
//                 { "bookItems.room": { $in: roomIds } }
//             ]
//         });

//         for (let i = 0; i < bookItems.length; i++) {
//             const item = bookItems[i];
//             const bookedRooms = bookings.reduce((total, booking) => {
//                 const bookItem = booking.bookItems.find(bi => bi.room.equals(item.room));
//                 return total + (bookItem ? bookItem.qty : 0);
//             }, 0);
//             const room = rooms.find(r => r._id.equals(item.room));
//             if (bookedRooms + item.qty > room.numberOfRooms) {
//                 return res.status(409).send(`Not enough rooms available for ${room.name} on the requested dates.`);
//             }
//         }

//         const totalPrice = bookItems.reduce((total, item) => {
//             const room = rooms.find(r => r._id.equals(item.room));
//             return total + (room.price * item.qty);
//         }, 0);
//         const booking = new Book({ checkInDate, checkOutDate, qtyRoom, user: userId, bookItems, price: totalPrice });
//         await booking.save();

//         return res.status(201).send(booking);
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// });

bookRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const { checkInDate, checkOutDate, qtyRoom, bookItems, moneySlip } =
        req.body;
      // Validate checkInDate and checkOutDate
      console.log(checkInDate);
      console.log(checkOutDate);
      if (checkInDate >= checkOutDate) {
        return res.status(400).send("Invalid check-in and check-out dates.");
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).send("User not found.");
      }

      const roomIds = bookItems.map((item) => item.room);
      const rooms = await Room.find({ _id: { $in: roomIds } });
      if (rooms.length !== roomIds.length) {
        return res.status(404).send("One or more rooms not found.");
      }

      // Check if the date range is already reserved
      let existingBookings = await Book.find({
        $and: [
          {
            $or: [
              { checkInDate: { $gte: checkInDate, $lte: checkOutDate } },
              { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } },
              {
                $and: [
                  { checkInDate: { $lte: checkInDate } },
                  { checkOutDate: { $gte: checkOutDate } },
                ],
              },
            ],
          },
          { "bookItems.room": { $in: roomIds } },
        ],
      });

      for (let i = 0; i < bookItems.length; i++) {
        const item = bookItems[i];
        const bookedRooms = existingBookings.reduce((total, booking) => {
          const bookItem = booking.bookItems.find((bi) =>
            bi.room.equals(item.room)
          );
          return total + (bookItem ? bookItem.qty : 0);
        }, 0);
        const room = rooms.find((r) => r._id.equals(item.room));
        if (bookedRooms + item.qty > qtyRoom) {
          return res.status(409).json({
            message:
              "ຂໍອະໄພວັນທີ່ທ່ານຈອງແມ່ນເຮືອນແພຫຼັງນີ້ຂອງເຮົາເຕັມແລ້ວລົບກວນລູກຄ້າຈອງໃນວັນທີ່ອື່ນ ຫຼື ເຮືອນແພຫຼັງອື່ນກ່ອນ",
          });
        }
      }

      // if (existingBookings.length >= qtyRoom) {
      //   const reservedDates = existingBookings
      //     .map((booking) => {
      //       const reservedRange = getReservedDateRange(
      //         checkInDate,
      //         checkOutDate,
      //         booking.checkInDate,
      //         booking.checkOutDate
      //       );
      //       return `${reservedRange.startDate} to ${reservedRange.endDate}`;
      //     })
      //     .join(", ");
      //   return res
      //     .status(409).json({
      //       message: "ຂໍອະໄພວັນທີ່ທ່ານຈອງແມ່ນເຮືອນແພຫຼັງນີ້ຂອງເຮົາເຕັມແລ້ວລົບກວນລູກຄ້າຈອງໃນວັນທີ່ອື່ນ ຫຼື ເຮືອນແພຫຼັງອື່ນກ່ອນ",
      //     })
      // }

      // Check if there are enough rooms available for the selected date range
      for (let i = 0; i < bookItems.length; i++) {
        const item = bookItems[i];
        const bookedRooms = getBookedRoomsForDateRange(
          item.room,
          checkInDate,
          checkOutDate
        );
        const room = rooms.find((r) => r._id.equals(item.room));
        if (bookedRooms + item.qty > room.numberOfRooms) {
          return res
            .status(409)
            .send(
              `Not enough rooms available for ${room.name} on the requested dates.`
            );
        }
      }

      const totalPrice = bookItems.reduce((total, item) => {
        const room = rooms.find((r) => r._id.equals(item.room));
        return total + room.price * item.qty;
      }, 0);
      const booking = new Book({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        qtyRoom,
        user: req.user._id,
        bookItems,
        moneySlip,
        price: totalPrice,
      });
      await booking.save();

      return res.status(201).send(booking);
    } catch (error) {
      return res.status(500).json({
        message: "ກະລູກນາປ້ອນຂໍ້ມູນໄຫ້ຄົບຖ້ວນ",
      });
    }
  })
);

function getReservedDateRange(
  checkInDate,
  checkOutDate,
  bookingCheckInDate,
  bookingCheckOutDate
) {
  const startDate = new Date(Math.max(checkInDate, bookingCheckInDate));
  const endDate = new Date(Math.min(checkOutDate, bookingCheckOutDate));
  return {
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString(),
  };
}

// function getReservedDateRange(checkInDate, checkOutDate, bookingCheckInDate, bookingCheckOutDate) {
//   const checkInMoment = moment(checkInDate, ["YYYY-MM-DD", "M/D/YYYY"], true);
//   const checkOutMoment = moment(checkOutDate, ["YYYY-MM-DD", "M/D/YYYY"], true);
//   const bookingCheckInMoment = moment(bookingCheckInDate, ["YYYY-MM-DD", "M/D/YYYY"], true);
//   const bookingCheckOutMoment = moment(bookingCheckOutDate, ["YYYY-MM-DD", "M/D/YYYY"], true);

//   if (!checkInMoment.isValid() || !checkOutMoment.isValid() || !bookingCheckInMoment.isValid() || !bookingCheckOutMoment.isValid()) {
//     // Invalid date values, return null
//     return null;
//   } else {
//     const startDate = moment.max(checkInMoment, bookingCheckInMoment).format("YYYY-MM-DD");
//     const endDate = moment.min(checkOutMoment, bookingCheckOutMoment).format("YYYY-MM-DD");
//     if (startDate < endDate) {
//       return { startDate: startDate, endDate: endDate };
//     } else {
//       // No overlap between the two date ranges, return null
//       return null;
//     }
//   }
// }

async function getBookedRoomsForDateRange(roomId, checkInDate, checkOutDate) {
  const bookings = await Book.find({
    $and: [
      {
        $or: [
          { checkInDate: { $gte: checkInDate, $lte: checkOutDate } },
          { checkOutDate: { $gte: checkInDate, $lte: checkOutDate } },
          {
            $and: [
              { checkInDate: { $lte: checkInDate } },
              { checkOutDate: { $gte: checkOutDate } },
            ],
          },
        ],
      },
      { "bookItems.room": roomId },
    ],
  });
  return bookings.reduce((total, booking) => {
    const bookItem = booking.bookItems.find((bi) => bi.room.equals(roomId));
    return total + (bookItem ? bookItem.qty : 0);
  }, 0);
}

// ADMIN GET BOOKS
bookRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const books = await Book.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json(books);
  })
);

// USER LOGIN BOOKS
bookRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(book);
  })
);

// BOOK IS CANCEL BY USER
bookRouter.put(
  "/:id/cancel",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.isCanceled = true;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// GET BOOK BY ID
bookRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate(
      "user",
      "name email tel"
    );

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error("book Not Found");
    }
  })
);

// BOOK IS Paid BY Admin
bookRouter.put(
  "/:id/isPaid",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.isPaid = true;
      book.notPaid = false;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// BOOK NOT Paid BY Admin
bookRouter.put(
  "/:id/notPaid",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.notPaid = true;
      book.isPaid = false;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// BOOK IS CONFIRMED CHECK-IN BY Admin
bookRouter.put(
  "/:id/isConfirmed",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.isConfirmed = true;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// BOOK IS CHECKOUT BY Admin
bookRouter.put(
  "/:id/isCheckOut",
  protect,
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.isCheckOut = true;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

export default bookRouter;
