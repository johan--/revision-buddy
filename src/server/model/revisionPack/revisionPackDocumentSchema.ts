import * as mongoose from "mongoose";
import {IRevisionPack as IRevisionPack} from "./revisionPack";
import {IRevisionPackDocument as IRevisionPackDocument} from "./revisionPackDocument";

let revisionPackSchema = new mongoose.Schema({
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

export let RevisionPack: mongoose.Model<IRevisionPackDocument> = mongoose.model<IRevisionPackDocument>("revisionPack", revisionPackSchema);