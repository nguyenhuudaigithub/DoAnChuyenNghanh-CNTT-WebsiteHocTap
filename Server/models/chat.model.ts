import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IChat extends Document {
  nameGroup: string;
  group: IGroup[];
  avatarGroup: {
    public_id: string;
    url: string;
  };
  message: IMessage[];
  chatAdmin: boolean;
}

interface IGroup extends Document {
  user: IUser;
}

interface IMessage extends Document {
  user: string;
  message: string;
  image: string;
}

const groupSchema = new Schema<IGroup>(
  {
    user: Object,
  },
  { timestamps: true }
);

const messageSchema = new Schema<IMessage>(
  {
    user: String,
    message: String,
    image: String,
  },
  { timestamps: true }
);

const chatSchema = new Schema<IChat>(
  {
    nameGroup: {
      type: String,
      required: true,
    },
    group: [groupSchema],
    message: [messageSchema],
    avatarGroup: {
      public_id: {
        type: String,
        default: "ImageGroup",
      },
      url: {
        type: String,
        default: "https://img.icons8.com/?size=256&id=110193&format=png",
      },
    },
    chatAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChatModel: Model<IChat> = mongoose.model("Chat", chatSchema);

export default ChatModel;
