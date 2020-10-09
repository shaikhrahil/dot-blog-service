import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, model } from 'mongoose';
import * as mongooseArray from 'mongoose-unique-array';
// @Schema({
//   timestamps: true,
//   strict: true,
// })
// export class Like extends Document {
//   @Prop()
//   assetId: string;

//   @Prop({ unique: true })
//   by: string[];
// }

// export const LikeSchema = SchemaFactory.createForClass(Like);

const LikeSchema = new MongooseSchema({
  assetId: [{ type: String }],
  by: [{ type: String, unique: true }],
});

LikeSchema.plugin(mongooseArray);

const Like = model('Like', LikeSchema, 'Like');

export { LikeSchema, Like };
