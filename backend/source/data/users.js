import bcrypt from 'bcryptjs'

const users = [
  {
    name    : 'Admin User',
    email   : 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin : true,
  },
  {
    name    : 'John Doe',
    email   : 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name    : 'Jane Doe',
    email   : 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name    : 'Phan Nam',
    email   : 'nam@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    address : "xuan hai, nghi xuan, ha tinh",
    phoneNumber: "0123456",
    gender  : true
  },
]

export default users