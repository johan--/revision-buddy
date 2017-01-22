import * as mongoose from "mongoose";
import {IUser as IUser} from "./user";
import {IUserDocument as IUserDocument} from "./userDocument";

let userSchema = new mongoose.Schema({
    user_name: { type: String, unique: true, index: true },
    phone_number: { type: Number, unique: true, index: true },
    email: { type: String, unique: true },

    password_hash: String,
    firstname: String,
    lastname: String,
    email_confirmed: { type: Boolean, default: false },
    phone_number_confirmed: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
    
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

export let User: mongoose.Model<IUserDocument> = mongoose.model<IUserDocument>("user", userSchema);