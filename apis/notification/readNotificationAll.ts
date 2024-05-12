import instance from '@apis/axios';

export default async function readNotificationAll(): Promise<{ data: string; status: number }> {
  const { data, status } = await instance.post(`/notification/readAll`);

  return { data, status };
}
