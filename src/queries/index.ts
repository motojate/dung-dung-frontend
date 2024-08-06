import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 데이터 캐싱 시간 설정 (5분)
      refetchOnWindowFocus: false, // 창이 포커스를 잃고 다시 얻었을 때 데이터 리패치 비활성화
      refetchOnReconnect: false, // 네트워크 재연결 시 데이터 리패치 비활성화
    },
  },
});
