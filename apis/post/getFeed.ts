import instance from '@apis/axios';
import { Order } from '@stores/useFilteringStore';

export interface GetFeedProps {
  page: number;
  size: number;
  cityLat?: number;
  cityLng?: number;
  sortBy: Order;
  categories: string;
  startDate: string;
  endDate: string;
  hasImage: boolean;
  hasLocation: boolean;
  minLikes: number;
  keyword: string;
}

export default async function getFeed(body: GetFeedProps) {
  const { data, status } = await instance.get('/post/feed', {
    params: body,
  });

  return { data, status };
}
