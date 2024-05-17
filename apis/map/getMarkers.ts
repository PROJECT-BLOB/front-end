import { Author, SubCategory } from '@/types/Post';
import instance from '@apis/axios';

export type Category = 'RECOMMENDED' | 'NOT_RECOMMENDED' | 'QUESTION' | 'WARNING' | 'HELP';

export interface GetMarkerRequest {
  categories?: string;
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export interface IMarker {
  postId: number;
  title: string;
  category: Category;
  subcategory: SubCategory;
  author: Author;
  lat: number;
  lng: number;
  createdDate: string;
}

export default async function getMarkers(request: GetMarkerRequest): Promise<{ data: IMarker[] | []; status: number }> {
  const { data, status } = await instance.get('/post/map', { params: request });

  return { data, status };
}
