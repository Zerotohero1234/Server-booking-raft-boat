import bcrypt from "bcryptjs";

const employees = [
  {
    name: "Manager",
    email: "employee@example.com",
    password: bcrypt.hashSync("123456", 10),
    position: "manager",
  },
  {
    name: "Employee1",
    email: "employee1@example.com",
    password: bcrypt.hashSync("123456", 10),
    position: "cleaner"
  },
  {
    name: "Employee2",
    email: "employee2@example.com",
    password: bcrypt.hashSync("123456", 10),
    position: "services"
  },
];

export default employees;