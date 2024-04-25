'use server';

import { db } from '@/db';
import { fromErrorsToFormState } from '@/helpers/from-errors-to-formstate';

import { toFormState } from '@/helpers/to-form-state';
import { signIn, signOut } from '@/auth';
import { formLoginSchema, formRegisterSchema } from '@/lib/schema';
import { FormState } from '@/types';
import { hash } from 'bcrypt';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import paths from '@/lib/paths';
import { routes } from '@/lib/routes';
import { setFlash } from '@/components/shared/feedback';

export const registerUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formRegisterSchema.safeParse(
      Object.fromEntries(formData),
    );

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }
    const { username, email, password } = schemaData.data;
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email, username }],
      },
    });

    if (existingUser) {
      return toFormState('ERROR', 'Username/Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return fromErrorsToFormState(error);
  }
  setFlash({
    type: 'SUCCESS',
    message: 'Account created successfully',
    timestamp: Date.now(),
  });
  redirect(paths.toLogin());
};

export const authorizeUser = async (
  formState: FormState,
  formData: FormData,
) => {
  try {
    const schemaData = formLoginSchema.safeParse(Object.fromEntries(formData));

    if (!schemaData.success) {
      return fromErrorsToFormState(schemaData.error);
    }

    const { email, password } = schemaData.data;
    await signIn('credentials', {
      email,
      password,
      redirectTo: routes.defaultRedirect,
    }).then(() => {});
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return fromErrorsToFormState(error);
  }
  return formState;
};

export const signOutUser = async () => {
  setFlash({
    type: 'SUCCESS',
    message: 'Logout successfully',
    timestamp: Date.now(),
  });
  await signOut({
    redirectTo: paths.toLogin(),
  });
};
