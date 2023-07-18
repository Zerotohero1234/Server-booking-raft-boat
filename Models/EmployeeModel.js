import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        img: {
            type: String
        },
        position: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    }
);

// Login



// Register




const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;