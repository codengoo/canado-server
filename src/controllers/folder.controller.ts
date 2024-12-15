import { Request, Response } from 'express';
import { IUser } from '../data';
import FolderModel from '../models/folder.model';
import {
  ICreateFolderPayload,
  IGetFolderPayload,
  IUpdateFolderPayload,
} from '../types/folder';
import { handleExceptions, ResponseData } from '../utils';
import {
  isHexColor,
  isIcon,
  isNumber,
  isObjectId,
  isUUIDv4,
  isValidString,
} from '../validations/base.validation';

export class FolderController {
  static async getFolder(req: Request, res: Response<ResponseData>) {
    const { limit, offset } = req.query as IGetFolderPayload;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isNumber(limit, { valueName: 'limit', nullable: true });
      isNumber(offset, { valueName: 'offset', nullable: true });

      const notes = await FolderModel.getAllMyFolder({
        offset: offset ? Number(offset) : 0,
        limit: limit ? Number(limit) : 50,
        userId: userId,
      });

      res.json({ message: 'Ok', data: notes });
    });
  }

  static async createFolder(req: Request, res: Response<ResponseData>) {
    const { title, ref, color, icon, notes } = req.body as ICreateFolderPayload;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isValidString(title, { valueName: 'title' });
      isUUIDv4(ref, { valueName: 'ref' });
      isHexColor(color, { valueName: 'color', nullable: true });
      isIcon(icon, { valueName: 'icon', nullable: true });
      isObjectId(notes, {
        valueName: 'notes',
        nullable: true,
        dataType: 'array',
      });

      const folder = await FolderModel.createFolder({ ...req.body, userId });
      // Update note
      res.json({ message: 'Created', data: { ...folder, ref } });
    });
  }

  static async updateFolder(req: Request, res: Response<ResponseData>) {
    const { color, icon, title } = req.body as IUpdateFolderPayload;
    const { id } = req.params;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isValidString(title, { valueName: 'title', nullable: true });
      isHexColor(color, { valueName: 'color', nullable: true });
      isIcon(icon, { valueName: 'icon', nullable: true });

      const folder = await FolderModel.updateFolder(id, {
        ...req.body,
        userId: userId,
      });
      res.json({ message: 'Updated', data: folder });
    });
  }

  static async deleteFolder(req: Request, res: Response<ResponseData>) {
    const { id } = req.params;
    const { id: userId } = req.user as IUser;

    await handleExceptions(res, async () => {
      isObjectId(id, { valueName: 'id', nullable: true });
      const folder = await FolderModel.deleteFolder(id, { userId });
      res.json({ message: 'Deleted', data: folder });
    });
  }
}
