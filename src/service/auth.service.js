import jwt from 'jsonwebtoken';
import Account from '../schemas/auth.schema.js';

const postAuth = async (data) => {
  const { name, surname, email, dni, password } = data;
  const account = await Account.findOne({ $or: [{ email }, { dni }] });
  if (account) throw new Error('Email/dni already in use!');

  const newAccount = new Account({
    name,
    surname,
    email,
    dni,
    password,
  });
  return newAccount.save((err) => {
    if (err) throw err;
  });
};

const getAuth = async (data) => {
  const { email, dni, password } = data;
  const login = await Account.findOne({ $or: [{ email }, { dni }] });

  if (!login) throw new Error('account invalid');
  const isValid = await login.isPasswordValid(password);
  if (!isValid) throw new Error('account inválida1');
  const payload = {
    email,
    dni,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
  return token;
};

const service = {
  postAuth,
  getAuth,
};

export default service;
