/* eslint-disable import/no-extraneous-dependencies */
import {
  Schema, model, Model, Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import Error401 from '../errors/error401';
import regexUrl from '../constants/regex';

export interface IUser {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) =>
   Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(value: string) {
        return regexUrl.test(value);
      },
    },
  },
});

userSchema.set('toJSON', {
  transform(doc: IUser, ret: Partial<IUser>) {
    const modifiedRet: Partial<IUser> = { ...ret };
    delete modifiedRet.password;
    return modifiedRet;
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new Error401('Неправильные почта или пароль'));
        }

        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error401('Неправильные почта или пароль'));
            }

            return user;
          });
      });
  },
);

export default model<IUser, UserModel>('user', userSchema);
