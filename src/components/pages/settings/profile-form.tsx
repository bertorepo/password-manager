'use client';
import { updateProfile } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notification';
import paths from '@/lib/paths';
import { profileFormSchema } from '@/lib/schema';
import { logOut } from '@/lib/sign-out';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProfileFormProps {
  session: Session | null;
}

const ProfileForm = ({ session }: ProfileFormProps) => {
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: session?.user.username,
      email: session?.user.email!,
    },
  });

  const {
    formState: { isSubmitting, isDirty },
  } = profileForm;

  const handleUpdateProfile = async (
    values: z.infer<typeof profileFormSchema>,
  ) => {
    const userResponse = await updateProfile(
      values,
      session?.user.email!,
      session?.user.username!,
    );
    if (userResponse?.errorMsg) {
      notify.error(userResponse.errorMsg);
    } else {
      if (userResponse?.userData) {
        notify.success(userResponse?.message);
        await logOut();
      }
    }
  };

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
        className="flex flex-col space-y-6"
      >
        {/* profile pic */}

        {/* end profile pic */}
        {/* username */}
        <FormField
          control={profileForm.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="username">Username </Label>
                    <Input
                      {...field}
                      type="text"
                      id="username"
                      autoComplete="off"
                      placeholder="Enter your username"
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            </>
          )}
        />
        <FormField
          control={profileForm.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <div className="mb-6 flex flex-col space-y-4">
                  {/* email */}
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            </>
          )}
        />

        <div className="flex items-center space-x-3 self-end ">
          <Button variant="outline" disabled={isSubmitting} asChild>
            <Link href={paths.toDashboard()}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}

            <span className={`${isSubmitting ? 'ml-2' : null}`}>
              {isSubmitting ? 'Updating...' : 'Save Profile'}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;