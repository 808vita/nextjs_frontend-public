import mongoose, { Document, Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDocument> {
  signup(email: string, password: string, name: string): any;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
  }
);

/**
 *
 * @param email
 * @param password
 * @param role
 * @returns user object
 *
 * userschema static method to signup new user
 *
 * Passwords are stored in hashform into the db
 */
UserSchema.statics.signup = async function (
  email: string,
  password: string,
  name: string
) {
  if (!email || !password || !name) {
    throw Error("All fields must be filled with valid details");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.create({
    email,
    password: hashedPassword,
    name,
  });

  return user;
};

const User =
  mongoose.models?.User || model<UserDocument, UserModel>("User", UserSchema);
export default User;
