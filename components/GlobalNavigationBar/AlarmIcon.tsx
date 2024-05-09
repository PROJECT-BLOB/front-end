import React from 'react';

import AlarmIconWithoutNew from '@icons/bell-01.svg?component';
import AlarmIconWithNew from '@icons/bell-alarm-24.svg?component';

interface AlarmProps {
  hasNewAlarm: boolean;
  onClick: () => void;
}

/*
 * TODO: 알람 할일
 * 알람 타입 만들기-> 로직 및 dto 확인 필요
 * 알람 axios 만들기.
 * AlarmQuery 만들기 -> useAlarmQuery
 * 서버상태: AlarmStore 만들기 -> useAlarmStore
 * */

export default function AlarmIcon({ hasNewAlarm = false, onClick }: AlarmProps) {
  return (
    <div>
      {hasNewAlarm ? (
        <AlarmIconWithNew width={24} height={24} onClick={onClick} />
      ) : (
        <AlarmIconWithoutNew width={24} height={24} onClick={onClick} />
      )}
    </div>
  );
}
