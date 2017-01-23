import {ICourse as ICourse} from "./course";
import * as mongoose from "mongoose";

export interface ICourseDocument extends ICourse, mongoose.Document {
}