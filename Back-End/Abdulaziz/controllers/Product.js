import db from "../models/index.js";

const {ProductModel}= db

export const addProduct= async(req,res)=>{
    const {title, description, category,price, supplier}=req.body
    try {
        const newProduct= await ProductModel.create({
            title,
            description,
            price,
            supplier,
            category
        })
        res.status(201).json({data: newProduct})
    } catch (error) {
        console.log("error ", error.message);
        res.status(404)
        
    }
}

export const getAll=async(req,res)=>{
    try {
        const prod= await ProductModel.findAll();
        res.status(200).json(prod)
    } catch (error) {
        // console.log("error ", error.message)
        res.status(400).json(error.message)
    }
}

 export const getOne=async(req,res)=>{
    const productId=req.params.id;
    try {
        const prod =await ProductModel.findById(productId);
        if(prod){
            res.status(200).json(prod)
        }
        else{
            res.status(404).json(`product ${productId} not found`);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
// export const removeProduct = async (req, res) => {
//     const { id } = req.body;
  
//     try {
//       const deleteProd = await ProductModel.findByIdAndDelete(id);
//       if (deleteProd)
//         res.status(200).send(`Product ${id} removed successfully!`);
//       else res.status(404).json(`Product ${id} not found!`);
//     } catch (error) {
//       res.status(500).json("Internal Server Error", error.message);
//     }
//   };


  export const removeProduct = async (req, res) => {
    const { id } = req.body;
  
    try {
    
      if (!req.user) {
        return res.status(401).json("Unauthorized: User not authenticated");
      }
  
    
      const product = await ProductModel.findById(id);
  
   
      if (!product) {
        return res.status(404).json(`Product ${id} not found!`);
      }
  
    
      if (req.user._id.toString() !== product.creator.toString()) {
        return res.status(403).json("Forbidden: You are not allowed to delete this product");
      }
  

      const deleteProd = await ProductModel.findByIdAndDelete(id);
      if (deleteProd)
        res.status(200).send(`Product ${id} removed successfully!`);
      else res.status(404).json(`Product ${id} not found!`);
    } catch (error) {
      res.status(500).json("Internal Server Error", error.message);
    }
  };