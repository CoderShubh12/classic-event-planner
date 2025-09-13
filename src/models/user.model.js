import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [6, "Password must be at least 6 characters."],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
