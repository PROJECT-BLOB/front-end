export default function calculateDisappearTime(expiresAt: string) {
  const now = new Date();
  const expireTime = new Date(expiresAt);
  let result = '';

  if (now < expireTime) {
    const secondDiff = (expireTime.getTime() - now.getTime()) / 1000;
    const second = Math.floor(secondDiff % 60).toString();
    const minute = Math.floor((secondDiff / 60) % 60).toString();
    let time = Math.floor(secondDiff / 3600).toString();

    if (secondDiff >= 86400) {
      // 24시간이 지났을 때
      const day = Math.floor(secondDiff / 86400).toString();
      time = Math.floor((secondDiff / 3600) % 24).toString(); // 24시간을 초과한 시간을 계산
      result = ` ${day}일 ${time}시간 ${minute}분 ${second}초 `;
    } else {
      result = ` ${time}시간 ${minute}분 ${second}초 `;
    }
  } else {
    return 0;
  }

  return result;
}
