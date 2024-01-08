import { Sequelize } from "sequelize";
import produts from "./produts.js";
import user from "./user.js";
import dotenv from "dotenv"
dotenv.config()

const sequelize= new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect:"mysql"
  }
)

const ProductModel= produts(sequelize,Sequelize)
const UserModel= user(sequelize,Sequelize)

const db={
  sequelize,
  Sequelize,
  ProductModel,
  UserModel,
}
export default db
