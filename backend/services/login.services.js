const bcrypt = require("bcrypt")
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotevn=require("dotenv");
const Booking = require("../models/booking");
dotevn.config()

async function saveUser(user){
       const salt=await bcrypt.genSalt();
       user.password=await bcrypt.hash(user.password,salt);
       return await User.create(user)
}

async function loginService(loginData) {
  try {
    const user = await User.findOne({ "email": loginData.email });
    if (!user) {
      throw new Error("L'utilisateur n'existe pas");
    }
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign({ "email": user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    // Return user ID and token
    return { userId: user._id, username:user.name, email:user.email, isAdmin: user.isAdmin, token: token };
  } catch (error) {
    throw error;
  }
}


async function findUsers() {
  return await User.find();

}

async function findUserById(idU){
  return await User.findById(idU);

}

async function findUserByQuery(query){
  return await User.find({name:{$regex:query,$options:"i"}});
}

async function removeUserById(idU) {
  try {
    const user = await User.findById(idU);
    if (!user) {
      throw new Error('User not found');
    }

    const booking = await Booking.findOne({ "user": idU });

    if (!booking) {
      return User.findByIdAndDelete(idU);   
       
    } else {
      throw new Error('User has active bookings and cannot be deleted');
    }
  } catch (error) {
    throw new Error(`Error removing room: ${error.message}`);
  }
}



async function updatePassword(userId, newPassword) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });

    if (!user) {
      throw new Error('User not found');
    }

    return { message: 'Password updated successfully' };
  } catch (error) {
    throw error;
  }
}



module.exports = {saveUser,updatePassword, removeUserById, findUserById, loginService,findUsers,findUserByQuery};