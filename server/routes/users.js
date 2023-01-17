import mongoose from "mongoose";
const router = mongoose.Router();
import {verifyToken} from "../middleware/auth"
import {getuser,getuserfriend,addremovefrend} from "../contollor/user"

router.get("/:id",verifyToken,getuser)
router.get("/:id/friends",verifyToken,getuserfriend)
router.patch("/:id/:friendid",verifyToken,addremovefrend)

export default router;
