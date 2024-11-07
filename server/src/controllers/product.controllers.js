import { Product } from "../models/product.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getProducts = asyncHandler( async (req, res) => {

    const { page=1, limit=5, query={}, sortBy="id", sortType="asc" } = req.query

    const sortOptions = {}
    sortOptions[sortBy] = sortType

    const skip = parseInt(page - 1) * parseInt(limit)

    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limit);

    if(!products.length > 0){
        new ApiResponse(200, [], "All data have been fetched successfully!")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(200, products, "Products fetched successfully!")
    )

})

export {
    getProducts,
}