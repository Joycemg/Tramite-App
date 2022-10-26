import mongoose from 'mongoose';

const { Schema } = mongoose;

const procedureSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, default: null },
    type: { type: String, require: true, default: 'Documentacion' },
    createdAt: {
      type: Date,
      require: true,
      default: new Date(),
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Person' },
  },
  {
    collection: 'Procedures',
    versionKey: false,
  },
);

export default mongoose.model('procedure', procedureSchema);
