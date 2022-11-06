import mongoose from 'mongoose';

const { Schema } = mongoose;

const procedureSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    type: { type: String, require: true, default: 'Particular' },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    closingDate: {
      type: Date,
    },
    key: { type: String, require: true },
    from: { type: Schema.Types.ObjectId, ref: 'Person', require: true },
  },
  {
    collection: 'Procedures',
    versionKey: false,
  },
);

export default mongoose.model('Procedure', procedureSchema);
