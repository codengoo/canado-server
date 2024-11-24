import database from '../configs/database';

interface ICreateUserProps {
  sub: string;
  email: string;
  displayName: string;
  avatar: string;
}

export default class UserModel {
  static async createUser({
    avatar,
    displayName,
    email,
    sub,
  }: ICreateUserProps) {
    const user = await database.user.create({
      data: {
        avatar,
        displayName,
        sub,
        email,
        username: email,
      },
    });

    return user;
  }

  static async getUserByID(sub: string) {
    const user = await database.user.findUnique({
      where: {
        sub,
      },
    });

    return user;
  }

  static async updateAvatar(sub: string, avatar: string) {
    const user = await database.user.update({
      where: {
        sub,
      },
      data: {
        avatar,
      },
    });

    return user;
  }
}
