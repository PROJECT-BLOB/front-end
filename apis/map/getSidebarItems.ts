import instance from '@apis/axios';
import { GetMarkerRequest, IMarker } from '@apis/map/getMarkers';

interface GetSidebarItemsResponse {
  content?: IMarker[] | [];
  count: number;
  currentPage: number;
  hasMore: boolean;
}

export type Sort = 'recent' | 'hot' | 'likes' | 'views';

export type SortInSidebar = 'recent' | 'hot';

type GetSidebarItemsRequest = GetMarkerRequest & {
  page: number;
  size: number;
  sortBy: SortInSidebar;
};

export default async function getSidebarItems(
  request: GetSidebarItemsRequest,
): Promise<{ data: GetSidebarItemsResponse; status: number }> {
  const { data, status } = await instance.get('/post/map-sidebar', { params: request });

  return { data, status };
}
