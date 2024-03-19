import { i18n } from '~/configs';
import { jwtDecode } from 'jwt-decode';

export const t = i18n.t;

export const decodeJwt = (token?: string | null) => {
  if (token) return jwtDecode<Types.Utils.JwtToken>(token);
  else return null;
};

export const isValidToken = (token: string) => {
  const decoded = decodeJwt(token);
  return (
    !!decoded &&
    (new Date(Number(decoded.exp) * 1000).getTime() - Date.now()) / 1000 > 0
  );
};

export class User {
  id: string | null = null;
  email: string = '';
  name: string = '';
  given_name: string = '';
  family_name: string = '';
  picture?: string;
}
