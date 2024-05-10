import { db } from '@/db';
import { getCurrentUser } from '@/lib/current-user';
import { cache } from 'react';

export const getUsersData = cache(async () => {
  try {
    const currentUsers = await getCurrentUser();
    if (!currentUsers || !currentUsers.id) throw new Error('Unauthorized');

    const allCredentials = await db.user.findFirst({
      where: { id: currentUsers.id },
      select: {
        webCredentials: {
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        emailCredentials: {
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        notes: {
          orderBy: [{ isImportant: 'desc' }, { updatedAt: 'desc' }],
        },
        password: false,
        imageUrl: false,
        email: false,
        emailVerified: false,
        username: false,
        role: false,
        id: false,
      },
    });

    if (!allCredentials) return null;

    const { webCredentials, emailCredentials, notes } = allCredentials;

    return {
      currentWebCredentials: webCredentials,
      currentEmailCredentials: emailCredentials,
      currentNotes: notes,
    };
  } catch (error) {
    throw new Error('Something went wrong');
  }
});
