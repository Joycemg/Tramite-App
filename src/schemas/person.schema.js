import mongoose from 'mongoose';

const { Schema } = mongoose;

const personSchema = new Schema(
  {
    name: { type: String, require: true },
    surname: { type: String, requiere: true },
    DateOfBirth: { type: Object, require: true },
    dni: { type: String, requiere: true, unique: true },
    email: {
      type: String,
      lowerclase: true,
    },
    phone: { type: String, requiere: true },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    createdBy: {
      idAdm: { type: Schema.Types.ObjectId, ref: 'Account', required: false },
      name: { type: String },
      surname: { type: String },
      dni: { type: String },
    },
  },
  {
    collection: 'People',
    versionKey: false,
  },
);

const Person = mongoose.model('Person', personSchema);
export default Person;
