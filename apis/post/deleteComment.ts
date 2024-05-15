import instance from '@apis/axios';

export default async function deleteComment(commentId: number) {
  try {
    const { data, status } = await instance.delete(`/comment/${commentId}`);

    // eslint-disable-next-line no-alert
    alert(data);

    return { data, status };
  } catch (error) {
    console.error(error);
  }
}
