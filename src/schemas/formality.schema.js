import mongoose from 'mongoose';

const { Schema } = mongoose;

const formalitySchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, default: null },
    createdAt: {
      type: Date,
      require: true,
      default: new Date(),
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Person', require: true },
  },
  {
    collection: 'Formalities',
    versionKey: false,
  },
);

export default mongoose.model('Formality', formalitySchema);
