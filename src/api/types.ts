export type User = {
  id: number;
  'first_name': string;
  'second_name': string;
  'display_name': string;
  'login': string;
  'email': string;
  'phone': string;
  'avatar': string;
};

export type Login = {
  'login': string;
  'password': string;
};

export type Registration = Omit<User, 'id' & 'avatar' & 'display_name'> & {
  password: string;
  repeat_password: string
};

export type Profile = Omit<User, 'id' & 'avatar'>;

export type Avatar = {
  avatar: object
};

export type Chat = {
  id: number;
  title: string;
};

export type Token = {
  token: string
};
