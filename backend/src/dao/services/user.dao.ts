import { Injectable } from "@nestjs/common";
import { FilterQuery, Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, QueryWithHelpers, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "../entities";

@Injectable()
export class UserDao {
    constructor(
        @InjectModel(User.name) private userModel : Model<User>,
    ) {}

    async findOneUser(
        filter: FilterQuery<UserDocument>,
        projection?: ProjectionType<UserDocument> | null | undefined,
        options?: QueryOptions<UserDocument> | null | undefined
    ):Promise<UserDocument> {
        return await this.userModel.findOne(filter,projection,options)
    }

    async insertUser(docs: User | User[]):Promise<UserDocument> {
        try {
            return this.userModel.create(docs);
        } catch (error) {
            throw error;
        }
    }

}