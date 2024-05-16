import updateCommentReport from '@apis/post/updateCommentReport';
import updatePostReport from '@apis/post/updatePostReport';

export default function useReport() {
  // 신고
  function handleClickReport(isPost: boolean, id: number) {
    if (isPost) {
      updatePostReport(id);
    } else {
      updateCommentReport(id);
    }
  }

  return { handleClickReport };
}
