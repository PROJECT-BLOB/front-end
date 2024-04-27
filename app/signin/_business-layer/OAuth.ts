// 1. 셋팅된 URL준비

// TODO: env파일로 숨겨야합니다.
export const OAUTH_GOOGLE = 'google.com';

export const OAUTH_KAKAO = 'kakao.com';

export const OAUTH_NAVER = 'naver.com';

// 아래와 같이 만들기.
//  const CLIENT_ID = process.env.REACT_APP_REST_API_KEY; - 필요x
//  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL; - 필요x
//  export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`; - 필요x
// 예시)getRedirectUrl(google) : 리퀘스트 보내서 리다이렉트 url 받아옴. 2번으로 넘어감

// 2. 리다이렉트 url에서 코드 받아오기
// ex: http:localhost:3000/login/kakao?code='~~~~~~~~~~~'
// let code = new URL(window.location.href).searchParams.get('code');

// 3. 코드를 백엔드에 보내고 toekn 받기.
// const response = await axios.get(`/oauth/token?code=${code}`, {
//     withCredentials: true,
//   });
//   const { accessToken } = response.data;
//   const { refreshToken } = response.data;
//   cookie.save("accessToken", accessToken, {
//     path: "/",
//   });
//   cookie.save("refreshToken", refreshToken, {
//     path: "/",
//   });
//   setToken;
//   dispatch(setToken(accessToken));

// 4. 여기서부터 유저에 쿠키에 token이 있으니 헤더에 계속 담김. (api>axios.ts에서 instance 설정됨.)

// TODO: 로그아웃
// TODO: token이 만료되면, refreshToken으로 토큰 재설정하는 로직.-interceptor
