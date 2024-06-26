'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { USER_NAV_PROFILE } from '@/constants';
import { LogOut } from 'lucide-react';
import AvatarProfile from '@/components/shared/avatar-profile';
import { signOutUser } from '@/actions';
import { useCurrentUser } from '@/hooks/use-current-user';

const UserNav = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const UserNavDropDown = () =>
    USER_NAV_PROFILE.map((list) => (
      <Link key={list.label} href={list.path}>
        <DropdownMenuItem className="transition-300 group flex items-center space-x-1 hover:bg-primary/10">
          <list.icon className="transition-300 size-4 group-hover:text-primary" />
          <span className="transition-300 group-hover:text-primary">
            {list.label}
          </span>
        </DropdownMenuItem>
      </Link>
    ));

  return (
    <DropdownMenu>
      {/* trigger button */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-7 rounded-full">
          <AvatarProfile className="size-7" />
        </Button>
      </DropdownMenuTrigger>
      {/* end trigger button */}

      {/* menu */}
      <DropdownMenuContent
        className="w-48 text-muted-foreground/70"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1 font-space">
            <p className="text-sm font-medium leading-none text-primary">
              @{currentUser?.username}
            </p>
            <p className="text-sm">{currentUser?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-muted-foreground">
          <UserNavDropDown />

          {/* logout */}
          <DropdownMenuItem
            className="transition-300 group flex items-center space-x-1 hover:bg-primary/10"
            onClick={async () => await signOutUser()}
          >
            <LogOut className="transition-300 size-4 group-hover:text-primary" />
            <span className="transition-300 group-hover:text-primary">
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      {/* End menu */}
    </DropdownMenu>
  );
};

export default UserNav;
