import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        image: {
            type: [String],
            require: true,
        },
        type: {
            type: [String],
        },
        title: {
            type: String,
            require: true,
        },
        desc: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        numberOfRooms: {
            type: Number,
            require: true,
            default: 1,
        },
        // numberOfRooms: {
        //     type: [{
        //         number: {
        //             type: Number,
        //             required: true
        //         }
        //     }],
        //     default: [{number: 1}],
        // },
        // numberOfRooms: [{ number: Number, unavailableDates: {type: [Date]}}],
        availableRooms: { type: Number, require: true },
        featured: {
            type: Boolean,
            default: false,
        },
        // unavailableDates: {
        //     type: [Date]
        // }
    },
    {
        timestamps: true,
    }
);

const Rooms = mongoose.model('Rooms', roomSchema);

export default Rooms;