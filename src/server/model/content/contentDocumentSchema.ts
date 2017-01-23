import * as mongoose from "mongoose";
import {IContent as IContent} from "./content";
import {IContentDocument as IContentDocument} from "./contentDocument";

let contentSchema = new mongoose.Schema({
    board: String,
    class: String,
    subject: String,
    name: String,
    content: [{
        node_name: String,
        parent_node_id: String,
        type: String,
        file_name: String,
        file_type: String
    }]
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

export let User: mongoose.Model<IContentDocument> = mongoose.model<IContentDocument>("content", contentSchema);