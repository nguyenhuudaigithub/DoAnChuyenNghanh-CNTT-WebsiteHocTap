// import mongoose, { Document, Model, Schema } from 'mongoose';

// const messageSchema = new Schema<IMessage>(
//   {
//     sender: {
//       type: String,
//       ref: 'User',
//     },

//     content: {
//       type: String,
//       trim: true,
//     },
//     chat: {
//       type: String,
//       ref: 'Chat',
//     },
//   },
//   { timestamps: true }
// );

// export interface IMessage extends Document {
//   sender: string;
//   content: string;
//   chat: string;
// }

// const MessageModel: Model<IMessage> = mongoose.model('Message', messageSchema);

// export default MessageModel;
