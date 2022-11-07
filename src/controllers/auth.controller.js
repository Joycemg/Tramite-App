import service from '../services/auth.service.js';

export const signIn = async (_, res) => {
  try {
    const user = await service.postAuth(_.body);
    return res.status(201).json({ message: 'Register', user });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};

export const logIn = async (_, res) => {
  try {
    const login = await service.getAuth(_.body);
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully!',
      token: `Bearer ${login}`,
    });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};
