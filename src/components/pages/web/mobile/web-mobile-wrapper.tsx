import React from 'react';

import { notFound } from 'next/navigation';
import { fetchAllCredentialsByUser } from '@/actions';
import DataListCredentials, {
  CredentialTarget,
} from '@/components/pages/shared/data-list-credentials';
import { formatDistance } from 'date-fns';

const WebMobileCardWrapper = async () => {
  const webCredentialsList = await fetchAllCredentialsByUser();

  if (!webCredentialsList) {
    return notFound();
  }

  const webCredentialData: CredentialTarget[] = webCredentialsList.map(
    (credential) => {
      const formattedDate = formatDistance(credential.createdAt, new Date(), {
        addSuffix: true,
      });
      return {
        title: credential.title,
        label: formattedDate,
        isImportant: credential.isImportant,
        credentialId: credential.id,
        __credentialType: 'Web',
      };
    },
  );
  return <DataListCredentials<CredentialTarget> list={webCredentialData} />;
};

export default WebMobileCardWrapper;
