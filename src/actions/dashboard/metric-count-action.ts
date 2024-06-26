'use server';

import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';

export const usersWithCount = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) throw new Error('Unauthorized');

    const dataCount = await db.user.findMany({
      where: { id: currentUser.id },
      select: {
        _count: {
          select: {
            webCredentials: {
              where: {
                isDeleted: false,
              },
            },
            notes: {
              where: {
                isDeleted: false,
              },
            },
            emailCredentials: {
              where: {
                isDeleted: false,
              },
            },
          },
        },
      },
    });

    return dataCount;
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};
