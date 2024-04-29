import { Post } from '@/types/Post';
import instance from '@apis/axios';

// interface CreatePost {
//   data: {
//     title: string;
//     content: string;
//     category: string;
//     subcategory: string;
//     country: string;
//     city: string;
//     lat: number;
//     lng: number;
//     actualLat: number;
//     actualLng: number;
//   };
//   file: File;
// }

export default async function createPost(formData: FormData): Promise<{ data: Post; status: number }> {
  const { data, status } = await instance.post(`/post`, formData);

  return { data, status };
}
