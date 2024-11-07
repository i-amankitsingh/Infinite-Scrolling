import Router from "express"
import { 
    getProducts,
} from "../controllers/product.controllers.js"

const router = Router()

router.route("/products").get(getProducts)


export default router;