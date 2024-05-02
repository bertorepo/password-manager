import { db } from '@/db';

export const fetchUserById = (userId: string) => {
  return db.user.findUnique({ where: { id: userId } });
};

export const fetchUserByEmail = (email: string) => {
  return db.user.findUnique({ where: { email } });
};
