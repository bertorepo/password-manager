import React from 'react';
import { Separator } from '@/components/ui/separator';
import CredentialForm from '@/components/pages/settings/credential-form';
import { getCurrentUser } from '@/lib/current-user';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
};

const Credential = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Credential</h3>
        <p className="text-sm text-muted-foreground">
          Update your password credential
        </p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-6">
        <CredentialForm currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Credential;
