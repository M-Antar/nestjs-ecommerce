import { Types } from "mongoose";

export class Category {
    readonly_id!:Types.ObjectId;
    name!:string;
    slug!:string;
    createdBy!:Types.ObjectId;
    updatedBy!:Types.ObjectId;

    logo!:Object;
}
