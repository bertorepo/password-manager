import { GlobeIcon, Mail } from 'lucide-react';
import { ItemProps } from '@/components/pages/shared/data-list-credentials';
import CredentialItem, { Item } from '@/components/shared/credential-item';
import paths from '@/lib/paths';
import { EmailCredentialType, WebCredentialType } from '@/types';

export const WebCredentialItem = ({ item }: ItemProps<WebCredentialType>) => {
  const itemData: Item = {
    credentialId: item.id || '',
    title: item.title || '',
    label: item.siteUrl || '',
    Icon: GlobeIcon,
    isImportant: item.isImportant || false,
    desktopLink: () => paths.toWebItem(item.id || ''),
    mobileLink: () => paths.toWebItemMobile(item.id || ''),
  };
  return <CredentialItem data={itemData} />;
};
export const EmailCredentialItem = ({
  item,
}: ItemProps<EmailCredentialType>) => {
  const itemData: Item = {
    credentialId: item.id || '',
    title: item.title || '',
    label: item.siteUrl || '',
    Icon: Mail,
    isImportant: item.isImportant || false,
    desktopLink: () => paths.toEmailItem(item.id || ''),
    mobileLink: () => paths.toEmailItemMobile(item.id || ''),
  };
  return <CredentialItem data={itemData} />;
};
