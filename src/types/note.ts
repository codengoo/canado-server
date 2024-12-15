import { ENotePriority, ENoteStatus } from '../data';
import { IGetQueryPayload } from './common';

export interface IGetNotePayload extends IGetQueryPayload {
  status?: ENoteStatus;
}

export interface ICreateNotePayload {
  title: string;
  content: string;
  ref: string;
  priority?: ENotePriority;
  folderId?: string;
}

export interface IUpdateNotePayload {
  title?: string;
  content?: string;
  priority?: ENotePriority;
  folderId?: string;
  status?: ENoteStatus;
}

export interface IDeleteNotePayload {
  userId: string;
}
