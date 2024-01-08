import  express  from "express";
import { getAll, addProduct, getOne, } from "../controllers/Product.js";

const prodRoute= express.Router()

prodRoute.post("/add",addProduct)
prodRoute.get("/read",getAll)
prodRoute.get("/readOne:id",getOne)

export default prodRoute