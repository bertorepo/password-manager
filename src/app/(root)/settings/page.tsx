import { Separator } from '@/components/ui/separator';
import React from 'react';
import AvatarFormUpload from '@/components/pages/settings/avatar-form-upload';
import ProfileForm from '@/components/pages/settings/profile-form';
import { getCurrentUser } from '@/lib/current-user';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Update your profile</p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-6">
        <AvatarFormUpload />
        <ProfileForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default ProfilePage;
