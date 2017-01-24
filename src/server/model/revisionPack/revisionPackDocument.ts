import {IRevisionPack as IRevisionPack} from "./revisionPack";
import * as mongoose from "mongoose";

export interface IRevisionPackDocument extends IRevisionPack, mongoose.Document {
}