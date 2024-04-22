import { useForm } from 'react-hook-form';

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

  function onSubmit(formData: ContentField) {
    // formData 처리 해줘야 함
    // 데이터 post 요청 보내줘야 함
    console.log(formData);
    toggleModal();
  }

  return { register, setValue, handleSubmit, onSubmit, cancelForm };
}
