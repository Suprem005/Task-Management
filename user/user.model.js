import mongoose from "mongoose";
import { string } from "yup";

// create schema/rule
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 55,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "others"],
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
});

// to remove password field in response when the details are converted to JSON from DB

userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// create table/collection/model

const User = mongoose.model("User", userSchema);

export default User;
