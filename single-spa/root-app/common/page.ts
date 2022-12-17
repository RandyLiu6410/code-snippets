export interface PageInfo {
  totalDocs?: number;
  limit?: number;
  page?: number;
  pagingCounter?: number;
  totalPages?: number;
  nextPage?: number;
  prevPage?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface PageOptionsInput {
  pagination: boolean;
  page: number;
  limit: number;
}
