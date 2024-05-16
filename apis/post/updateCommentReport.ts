/* eslint-disable no-alert */
import { AxiosError } from 'axios';

import instance from '@apis/axios';

export default async function updateCommentReport(commentId: number) {
  try {
    const { data, status } = await instance.post(`/comment/report/${commentId}`);

    alert(data);

    return { data, status };
  } catch (error) {
    if (error instanceof AxiosError) alert(error.response?.data.message);
  }
}
