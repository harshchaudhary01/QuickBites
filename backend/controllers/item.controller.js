import Item from "../models/item.model";
import Shop from "../models/shop.model";
import uploadOnCloudinary from "../utils/cloudinary";


export const addItem = async (req,res)=>{
    try {
        const {name, category, price, foodType} = req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        const shop = await Shop.findOne({owner: req.userId})
        if(!shop){
            return res.status(400).json({message: `shop not found!`})
        }
        const item = await Item.create({
            name, category, price, foodType, image, shop: shop._id
        })
        return res.status(201).json(item)

    } catch (error) {
        return res.status(500).json({message: `Add Item Error: ${error}`})
    }
}

export const editItem = async (req,res)=>{
    try {
        const itemId = req.params(itemId);
        const {name, category, price, foodType} = req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }
        const item = await Item.findByIdAndUpdate(itemId,{
            name, category, price, foodType, image
        },{new: true})

        if(!item){
            return res.status(400).json({message: `item not found!`})
        }
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({message: `Edit Item Error: ${error}`})
    }
}