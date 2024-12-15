export enum ENoteStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
}

export enum ENotePriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface IUser {
  id: string;
  sub: string;
  email: string;
  displayName: string;
  username: string;
  avatar: string;
}
