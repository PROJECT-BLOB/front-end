import { useForm } from 'react-hook-form';

interface ContentField {
  title: string;
  content: string;
  image: File;
}

export default function useCreateForm() {
  const { register, handleSubmit } = useForm<ContentField>();

  function onSubmit(formData: ContentField) {
    // formData 처리 해줘야 함
    console.log(formData);
  }

  return { register, handleSubmit, onSubmit };
}
