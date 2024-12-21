import * as bcrypt from 'bcrypt';

// Function to encrypt password
export const encrypt = async (password: string, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

// Function to compare password
export const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
