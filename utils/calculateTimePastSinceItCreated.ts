export default function calculateTimePastSinceItCreated(createdAt: string = '') {
  const now = new Date();
  const formattedDate = new Date(createdAt);
  const mSecDiff = now.getTime() - formattedDate.getTime();
  const minDiff = Math.floor(mSecDiff / (60 * 1000));
  const hourDiff = Math.floor(minDiff / 60);
  const dayDiff = Math.floor(hourDiff / 24);
  const monthDiff = Math.floor(dayDiff / 30);

  if (minDiff < 2) return '1분 전';

  if (minDiff < 60) return `${minDiff}분 전`;

  if (minDiff >= 60 && minDiff < 120) return `1시간 전`;

  if (hourDiff >= 2 && hourDiff < 24) return `${hourDiff}시간 전`;

  if (hourDiff >= 24 && hourDiff < 48) return `1일 전`;

  if (dayDiff >= 1 && dayDiff < 31) return `${dayDiff}일 전`;

  if (monthDiff >= 1 && monthDiff < 2) return `1달 전`;

  if (monthDiff >= 2 && monthDiff < 12) return `${monthDiff}달 전`;

  if (monthDiff >= 12 && monthDiff < 24) return `년 전`;

  return `${Math.floor(dayDiff / 365)}년 전`;
}
