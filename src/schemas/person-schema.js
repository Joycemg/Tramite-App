import mongoose from 'mongoose';

const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, requiere: true },
  age: { type: Number, requiere: true },
  email: {
    type: String,
    requiere: true,
    unique: true,
    lowerclase: true,
    validate: [emailValidate, 'Error format'],
  },
  password: { type: String, requiere: true },
});
const emailValidate = (value) => {
  return /^.+@.+\..+$/.test(value);
};

export default mongoose.model('person', personSchema);
