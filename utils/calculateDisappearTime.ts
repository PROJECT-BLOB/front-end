export default function calculateDisappearTime(expiresAt: string) {
  const now = new Date();
  const expireTime = new Date(expiresAt);
  const secondDiff = (expireTime.getTime() - now.getTime()) / 1000;
  const second = (secondDiff % 60).toFixed(0);
  const minute = ((secondDiff / 60) % 60).toFixed(0);
  const time = ((secondDiff / 3600) % 60).toFixed(0);

  const result = ` ${time}시간 ${minute}분 ${second}초 `;

  return result;
}
