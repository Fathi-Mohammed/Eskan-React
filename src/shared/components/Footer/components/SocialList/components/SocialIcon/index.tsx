import React from 'react';
import Facebook from '@/assets/images/socials/facebook.svg?react';
import Twitter  from '@/assets/images/socials/twitter.svg?react';
import Snapchat  from '@/assets/images/socials/snapchat.svg?react';
import OldTwitter  from '@/assets/images/socials/old_twitter.svg?react';
import Whatsapp  from '@/assets/images/socials/whatsappp.svg?react';
import Instagram  from '@/assets/images/socials/instagram.svg?react';

type props = {
  iconName: string;
  className?: string;
};

export const SocialIcon : React.FC<props> = ({ iconName }) => {
  const iconMap = {
    facebook: (<Facebook />),
    twitter: (<Twitter />),
    snapchat: (<Snapchat />),
    oldTwitter: (<OldTwitter />),
    whatsapp: (<Whatsapp />),
    instagram: (<Instagram />),
  };

  const icon = iconMap[iconName];

  return icon;
};
