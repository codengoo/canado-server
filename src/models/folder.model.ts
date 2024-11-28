import database from '../configs/database';

export default class FolderModel {
  static async getAllMyFolder(user_id: string) {
    await database.folder.findMany({
      where: {
        userId: user_id,
      },
    });
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

  static async removeFolder(folder_id: string) {
    await database.folder.delete({
      where: {
        id: folder_id,
      },
    });
  }
}
