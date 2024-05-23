import { Box, Divider, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import EachElement from '../../components/utils/EachElement';
import SocialLoginButton, {
  ISocialLoginButtonProps,
} from '../../components/buttons/SocialLoginButton';
import LogoIcon from 'src/components/icons/LogoIcon';
import GoogleIcon from 'src/components/icons/social/GoogleIcon';
import NaverIcon from 'src/components/icons/social/NaverIcon';
import KakaoIcon from 'src/components/icons/social/KakaoIcon';
import { FC } from 'react';

const AuthMain: FC = () => {
  const socialLoginButtonList: ISocialLoginButtonProps[] = [
    {
      icon: <GoogleIcon />,
      label: 'Google로 계속하기',
      type: 'GOOGLE',
    },
    {
      icon: <NaverIcon />,
      label: 'Naver로 계속하기',
      type: 'NAVER',
    },
    {
      icon: <KakaoIcon />,
      label: 'Kakao로 계속하기',
      type: 'KAKAO',
    },
  ];

  return (
    <>
      <Box
        sx={{
          marginTop: 15,
          padding: '20px',
        }}
      >
        <LogoIcon />
        <Typography variant="h5" mt={1} mb={5} gutterBottom>
          {'Study Diary 계정에 로그인'}
        </Typography>
        <EachElement
          of={socialLoginButtonList}
          render={(item, idx) => (
            <SocialLoginButton key={`${item.type}-${idx}`} {...item} />
          )}
        />
        <Divider>또는</Divider>
        <Outlet />
      </Box>
    </>
  );
};

export default AuthMain;
