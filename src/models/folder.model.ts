import database from '../configs/database';
import {
  ICreateFolderPayload,
  IDeleteFolderPayload,
  IGetFolderPayload,
  IUpdateFolderPayload,
} from '../types/folder';

export default class FolderModel {
  static async getAllMyFolder(payload: IGetFolderPayload & { userId: string }) {
    const folder = await database.folder.findMany({
      where: {
        userId: payload.userId,
      },
      skip: payload.offset,
      take: payload.limit,
    });

    return folder;
  }

  static async getAllSharedFolder(user_id: string) {
    await database.userPreference.findFirstOrThrow({
      where: {
        userId: user_id,
      },
      select: {
        sharedFolders: true,
      },
    });
  }

  static async addSharedFolder(user_id: string, sharedFolders: string[]) {
    await database.userPreference.update({
      where: {
        userId: user_id,
      },
      data: {
        sharedFolderIds: {
          push: sharedFolders,
        },
      },
    });
  }

  static async removeSharedFolder(user_id: string, sharedFolders: string[]) {
    const { sharedFolderIds } = await database.userPreference.findFirstOrThrow({
      where: {
        userId: user_id,
      },
      select: {
        sharedFolderIds: true,
      },
    });

    if (sharedFolderIds) {
      const newSharedFolderIds = sharedFolderIds.filter(
        (item) => !sharedFolders.includes(item),
      );

      await database.userPreference.update({
        where: {
          userId: user_id,
        },
        data: {
          sharedFolderIds: newSharedFolderIds,
        },
      });
    }
  }

  static async updateFolder(
    is: string,
    payload: IUpdateFolderPayload & { userId: string },
  ) {
    const folder = await database.folder.update({
      where: {
        id: is,
        userId: payload.userId,
      },
      data: {
        title: payload.title,
        color: payload.color,
        icon: payload.icon,
      },
    });

    return folder;
  }

  static async createFolder(
    payload: ICreateFolderPayload & { userId: string },
  ) {
    const folder = await database.folder.create({
      data: {
        userId: payload.userId,
        title: payload.title,
        color: payload.color || '#F72C5B',
        icon: payload.icon || 'TbArchive',
      },
    });

    return folder;
  }

  static async deleteFolder(id: string, payload: IDeleteFolderPayload) {
    const folder = await database.folder.delete({
      where: {
        id: id,
        userId: payload.userId,
      },
    });

    return folder;
  }
}
