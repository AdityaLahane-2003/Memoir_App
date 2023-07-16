import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export const registerController= async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //validation
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }
      //exisiting user
      const exisitingUser = await userModel.findOne({ email });
      if (exisitingUser) {
        return res.status(401).send({
          success: false,
          message: "user already exisits",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //save new user
      const user = new userModel({ username, email, password: hashedPassword });
      await user.save();
      return res.status(201).send({
        success: true,
        message: "New User Created",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  }; 
  
  // get all users
  export const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Get ALl Users",
        error,
      });
    }
  };
  export const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found with this id",
        });
      }
      return res.status(200).send({
        success: true,
        message: "fetch User",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "error while getting user",
        error,
      });
    }
  };
  
  // export const getUserById = async (req, res) => {
  //   const userId = req.params.id; // Assuming the userId is passed as a route parameter
  
  //   try {
  //     const user = await userModel.findById(userId);
  
  //     if (!user) {
  //       return res.status(404).send({
  //         success: false,
  //         message: 'User not found',
  //       });
  //     }
  
  //     return res.status(200).send({
  //       success: true,
  //       message: 'User found',
  //       user,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({
  //       success: false,
  //       message: 'Error in retrieving user',
  //       error,
  //     });
  //   }
  // };
  
export const loginController= async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(401).send({
          success: false,
          message: "Please provide email or password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(200).send({
          success: false,
          message: "email is not registerd",
        });
      }
      //password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: "Invlid username or password",
        });
      }
      return res.status(200).send({
        success: true,
        messgae: "login successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error In Login Callcback",
        error,
      });
    }
  };
  