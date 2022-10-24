import mongoose from 'mongoose';

const { Schema } = mongoose;

const formalitySchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, requiere: true },
  Date: {
    type: Date,
    default: Date.now,
    transform: (date) =>
      date.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'person' },
});

export default mongoose.model('formality', formalitySchema);