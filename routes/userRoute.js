const express = require("express");

const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const authMiddleware= require("../middlewares/authMiddleware")

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "user already exists", success: false });
    }
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);

    await newuser.save();
    res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "user already exists", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch && user.isActive) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    } else if (isMatch && !user.isActive) {
      return res
        .status(200)
        .send({ message: "You are blocked from this site", success: false });
    } else {
      return res
        .status(200)
        .send({ message: "password incorrect", success: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "error logging in", success: false, error });
  }
});

/*router.post("/login", async (req, res) => {
  try {
    const user  = await User.findOne({ email:req.body.email})
    if(!user){
      return res.status(200).send({message:"user does not exist",success:false})
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
      return res.status(200).send({message:"password incorrect",success:false})
    }else{
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
      res.status(200).send({message:"Login successful",success:true,data:token});
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error logging in",success:false,error});
  }
});*/

router.post("/get-user-info-by-id",authMiddleware, async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.body.userId})
    user.password = undefined;
    if(!user){
      return res
      .status(200)
      .send({message:"user does not exixt",success:false})
    }else{
      res.status(200).send({success:true,
        data:user
      })
    }
  } catch (error) {
    res.status(500)
    .send({message:"error getting user info",success:false, error})
  }
})
router.post('/update-profile',authMiddleware,async(req,res)=>{
  try {
      const updateImage=req.body.imageUpdate
      console.log(updateImage);
      const user=await User.findOne({_id:req.body.userId})

      if(!user){
          return res.status(200).send({message:"Userr does not exist",success:false})
      }else{
          user.image=updateImage
          await user.save()
          res.status(200).send({message:"update profile successfully",success:true})
      }

  } catch (error) {
      res.status(500).send({
          message:"Error getting user-info",success:false,error
      })
  }
})
module.exports = router;
