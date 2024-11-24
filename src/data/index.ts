export enum ENoteState {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export interface IUser {
  id: string;
  sub: string;
  email: string;
  displayName: string;
  username: string;
  avatar: string;
}
