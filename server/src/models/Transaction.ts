import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  user: mongoose.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  category: string;
  description?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
