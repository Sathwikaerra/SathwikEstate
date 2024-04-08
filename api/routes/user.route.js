import express from "express";
import  {test, updateUser,deleteUser,showListings} from "../controllers/user.controler.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router();

router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,showListings)
export default router;