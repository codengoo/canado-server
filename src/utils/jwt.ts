import jwt from 'jsonwebtoken';

interface IToken {
  token: string;
  refresh: string;
}

export function generateToken(data: any): IToken {
  const token = jwt.sign(data, process.env.JWT_TOKEN);
  const refresh = jwt.sign(data, process.env.JWT_REFRESH);
  
  return {
    token,
    refresh,
  };
}
