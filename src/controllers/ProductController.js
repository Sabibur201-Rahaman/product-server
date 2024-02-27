const ProductModel = require("../models/ProductModel");
exports.createProduct = async(req, res) => {
  try {
    let reqBody = req.body;
    reqBody.email = req.headers["email"];
    let newProduct=await ProductModel.create(reqBody);
    if(newProduct){
      res.status(200).json({ status: "success", data: "datas" });

    }else{
      res.status(404).json({ status: "fail", data: "err" });

    }
  } catch (err){
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let query = { _id: id };
    let data = await ProductModel.deleteOne(query);
    if (data.deletedCount > 0) {
      res.status(200).json({ status: "success", data: data });
    } else {
      res.status(404).json({ status: "fail", data: "No document found to delete" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", message: "Some issues occurred" });
  }
};

  exports.updateProductStats = async (req, res) => {
    try {
        let id = req.params.id;
        let Query = { _id: id };
        let reqBody = req.body;
        
        // Update the product using await
        let updatedData = await ProductModel.updateOne(Query, reqBody);
        
        // Check if any document was modified
        if (updatedData) {
            res.status(200).json({ status: "success", data: updatedData });
        } else {
            res.status(404).json({ status: "fail", data: "Product not found or no changes applied" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
  

exports.listProductByBrand = async (req, res) => {
  try {
    let brand = req.params.brand;
    let email = req.headers['email'];

    const data = await ProductModel.aggregate([
      { $match: { brand: brand, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          brand: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    ]);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}



exports.listProductByCategory = async (req, res) => {
  try {
    let category = req.params.category;
    let email = req.headers['email'];

    const data = await ProductModel.aggregate([
      { $match: { category: category, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          category: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y"
            }
          }
        }
      }
    ]);
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}


exports.productsBrandCounts = async (req, res) => {
  try {
    let email = req.headers['email'];

    const data = await ProductModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$brand", count: { $sum: 1 } } }
    ]);

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}


exports.productsCategoryCounts = async (req, res) => {
  try {
    let email = req.headers['email'];

    const data = await ProductModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

// const demo=(num1,num2)=>{

// }

// demo(10,5)