import * as mongoose from "mongoose";
import {ICourse as ICourse} from "./course";
import {ICourseDocument as ICourseDocument} from "./courseDocument";

let courseSchema = new mongoose.Schema({
    board: String,
    class: String,
    subject: String,
    content: [{
        node_name: String,
        file_name: String,
        file_type: String,
        children: [{
            node_name: String,
            file_name: String,
            file_type: String
        }]
    }]
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

export let Course: mongoose.Model<ICourseDocument> = mongoose.model<ICourseDocument>("course", courseSchema);