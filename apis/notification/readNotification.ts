import instance from '@apis/axios';

// TODO: read보다는 delete가 맞지 않나..? api에는 post 메서드에 read 라고 되어있어서 일단 똑같이 했음
export default async function readNotification(notificationId: number): Promise<{ data: string; status: number }> {
  const { data, status } = await instance.post(`/notification/read/${notificationId}`);

  return { data, status };
}
