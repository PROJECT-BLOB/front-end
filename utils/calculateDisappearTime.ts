export default function calculateDisappearTime(expiresAt: string) {
  const now = new Date();
  const expireTime = new Date(expiresAt);
  let result = '';

  if (now < expireTime) {
    const secondDiff = (expireTime.getTime() - now.getTime()) / 1000;
    console.log(secondDiff);
    const second = Math.floor(secondDiff % 60).toString();
    const minute = Math.floor((secondDiff / 60) % 60).toString();
    const time = Math.floor((secondDiff / 3600) % 24).toString();

    result = ` ${time}시간 ${minute}분 ${second}초 `;
  } else {
    return 0;
  }

  return result;
}
