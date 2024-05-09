import { useForm } from 'react-hook-form';

import createPost from '@apis/post/createPost';

export interface ContentField {
  title: string;
  content: string;
  image: string[];
}

export default function useCreateForm(toggleModal: () => void) {
  const { register, handleSubmit, reset, setValue } = useForm<ContentField>();

  function cancelForm() {
    reset();
    toggleModal();
  }

  async function onSubmit(formData: ContentField) {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formData.image.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });
      await createPost(formDataToSend);
      console.log('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
    }

    toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm };
}
