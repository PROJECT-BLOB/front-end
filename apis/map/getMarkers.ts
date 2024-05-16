import { Author, SubCategory } from '@/types/Post';
import instance from '@apis/axios';

export type Category = 'RECOMMENDED' | 'NOT_RECOMMENDED' | 'QUESTION' | 'WARNING' | 'HELP';

// export enum Category_eunm {
//   RECOMMENDED = 'RECOMMENDED',
//   NOT_RECOMMENDED = 'NOT_RECOMMENDED',
//   QUESTION = 'QUESTION',
//   WARNING = 'WARNING',
//   HELP = 'HELP',
// }

// export enum SubCategory {
//   WEATHER = '날씨',
//   // RESTAURANT = '음식점',
//   // ACCOMMODATION = '숙소',
//   // HOSPITAL = '병원',
//   // TOILET = '화장실',
//   // PHARMACY = '약국',
//   // TRANSPORT = '교통',
//   // MUSEUM = '박물관',
//   // ATTRACTIONS = '관광지',
//   ATM = 'ATM',
// }

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
