import { IGetQueryPayload } from './common';

export interface IGetFolderPayload extends IGetQueryPayload {}

export interface ICreateFolderPayload {
  title: string;
  color?: string;
  notes?: string[];
  icon?: string;
  ref: string;
}

export interface IUpdateFolderPayload {
  title?: string;
  color?: string;
  icon?: string;
}

export interface IDeleteFolderPayload {
  userId: string;
}
