import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    qtyRoom: {
      type: Number,
      required: true,
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    bookItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        deposit:  { type: Number, required: true },
        qtyPerson: { type: Number, required: true },
        room: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Rooms",
        },
      },
    ],
    // bookItems: [
    //     {
    //       name: { type: String, required: true },
    //       qty: { type: Number, required: true },
    //       image: { type: String, required: true },
    //       price: { type: Number, required: true },
    //       room: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: "Rooms",
    //       },
    //     },
    // ],
    moneySlip:{ type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
    },
    // totalPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0,
    // },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    notPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCheckOut: {
      type: Boolean,
      required: true,
      default: false,
    },
    confirmedAt: {
      type: Date,
    },
    isCanceled: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
