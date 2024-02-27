const UsersModel = require("../models/UserModel");
const jwt = require("jsonwebtoken"); // Import the jwt module if not already imported

exports.registration = async (req, res) => {
  try {
    let reqBody = req.body;

    const data = await UsersModel.create(reqBody);
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(200).json({ status: "fail", data: err });
  }
};

exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    // console.log(reqBody)
    let data = await UsersModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]).exec();

    if (data.length) {
      let payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: data[0]["email"],
      };
      let token = jwt.sign(payload, "SecretKey123456789");
      res.status(200).json({ status: "success", token: token, data: data[0] });
    } else {
      res.status(401).json({ status: "unauthorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    // Attempt to update the user's profile
    const updatedData = await UsersModel.updateOne({ email: email }, reqBody);
    // Check if the update was successful
    if (updatedData) {
      res.status(200).json({ status: "success", data: updatedData });
    } else {
      res
        .status(404)
        .json({ status: "fail", data: "User not found or no changes applied" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.profileDetails = async (req, res) => {
  try {
      let email = req.headers['email'];
      let data = await UsersModel.aggregate([
          { $match: { email: email } },
          { $project: { _id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1 } }
      ]).exec();

      res.status(200).json({ status: "success", data: data });
  } catch (err) {
      res.status(400).json({ status: "fail", data: err });
  }
}

