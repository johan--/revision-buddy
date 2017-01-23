import {IContent as IContent} from "./content";
import * as mongoose from "mongoose";

export interface IContentDocument extends IContent, mongoose.Document {
}