import React, { FC, ReactNode } from 'react';
import { Button, Stack } from '@mui/material';
import { DEFAULT_WEB_SITE_TYPE } from 'src/constants/datas';

type TAuthProviderType = 'GOOGLE' | 'KAKAO' | 'NAVER';
export interface ISocialLoginButtonProps {
  icon: ReactNode;
  type: TAuthProviderType;
  label: string;
}

const SocialLoginButton: FC<ISocialLoginButtonProps> = props => {
  const handleClickSocialLogin = () => {
    const socialType = props.type.toLowerCase();
    const url = `http://localhost:3100/api/auth/login/${socialType}?site=${DEFAULT_WEB_SITE_TYPE}`;
    return (window.location.href = url);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        startIcon={props.icon}
        fullWidth
        variant="outlined"
        sx={{
          color: 'black',
        }}
        onClick={handleClickSocialLogin}
      >
        {props.label}
      </Button>
    </Stack>
  );
};

export default SocialLoginButton;
