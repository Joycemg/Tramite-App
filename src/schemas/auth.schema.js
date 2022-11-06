import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const emailValidator = (value) => /^.+@.+\..+$/.test(value);

const authSchema = new Schema(
  {
    name: { type: String, require: true },
    surname: { type: String, requiere: true },
    email: {
      type: String,
      requiere: true,
      unique: true,
      lowerclase: true,
      validate: [emailValidator, 'Incorrect email'],
    },
    dni: { type: String, require: true, unique: true },
    password: { type: String, requiere: true },
  },
  {
    collection: 'Accounts',
    versionKey: false,
  },
);

authSchema.pre('save', function pwd() {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(this.password, salt);
  this.password = passwordHash;
  if (!passwordHash) throw new Error('error save password');
});

authSchema.methods.isPasswordValid = async function cpwd(value) {
  const valid = await bcrypt.compare(value, this.password);
  if (!valid) throw new Error('error ispasswordvalid');
  return valid;
};

const Account = mongoose.model('Account', authSchema);
export default Account;
