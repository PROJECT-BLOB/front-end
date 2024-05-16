/* eslint-disable no-alert */
import { AxiosError } from 'axios';

import instance from '@apis/axios';

export default async function updatePostReport(postId: number) {
  try {
    const { data, status } = await instance.post(`/post/report/${postId}`);
    alert(data);

    return { data, status };
  } catch (error) {
    if (error instanceof AxiosError) alert(error.response?.data.message);

    console.error(error);
  }
}
