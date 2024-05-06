import React, { Suspense } from 'react';

import CredentialItemSkeleton from '@/components/pages/shared/credential-item-skeleton';
import { notFound } from 'next/navigation';

interface NotePreviewListProps {
  params: {
    id: string;
  };
}

const NotePreviewList = ({ params }: NotePreviewListProps) => {
  if (!params) {
    return notFound();
  }

  return (
    <div className="space-y-3">
      <Suspense fallback={<CredentialItemSkeleton />}>
        {/* <EmailPreviewPage params={params} /> */}
      </Suspense>
    </div>
  );
};

export default NotePreviewList;