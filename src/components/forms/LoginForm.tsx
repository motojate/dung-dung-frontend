import { Typography, TextField, FormHelperText, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import authApi from 'src/apis/auth';
import { AuthErrorCodeType } from 'src/types';
import { AUTH_ERROR_CODE_MAPPING } from 'src/constants/errorCodes';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { mutate, isLoading, isError, error } = useMutation(
    () => authApi.login({ userId, password, authProvider: 'LOCAL' }),
    {
      onSuccess: _ => navigate('/', { replace: true }),
      onError: (e: any) => {
        const errorCode: AuthErrorCodeType = e.response.data.code ?? 5000;
        e.message = AUTH_ERROR_CODE_MAPPING[errorCode];
      },
    }
  );

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  return (
    <>
      <form onSubmit={onLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="이메일"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={e => setUsername(e.target.value)}
          error={isError}
        />
        <TextField
          variant="outlined"
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          error={isError}
        />
        <Typography variant="button" color={'#0054FF'} className="red-hover">
          {'비밀번호를 잊어버리셨나요?'}
        </Typography>
        {isError && <FormHelperText error>{error?.message}</FormHelperText>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          {'비밀번호로 계속하기'}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
