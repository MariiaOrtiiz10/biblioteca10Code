import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Bookshelf{
    id: string;
    zone_id:string;
    zoneName:string;
    floor_id:string;
    floorName:string;
    floorNumber:number;
    genre:string;
    bookshelfNumber:number;
    booksCapacity  :number;
    created_at: string;
  }

  export interface ApiPaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }

  // Interface representing the expected format for the Table component
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  }

  interface UseBookshelvesParams {
    search?: string;
    page?: number;
    perPage?: number;
  }

export function useBookshelves({ search, page = 1, perPage = 10 }: UseBookshelvesParams = {}) {
  return useQuery({
    queryKey: ["bookshelves", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Bookshelf>>("/api/bookshelves", {
        params: {
          search,
          page,
          per_page: perPage,
        },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      // Transform the API response to the expected format
      return {
        data: apiResponse.data,
        meta: {
          current_page: apiResponse.current_page,
          from: apiResponse.from,
          last_page: apiResponse.last_page,
          per_page: apiResponse.per_page,
          to: apiResponse.to,
          total: apiResponse.total
        }
      } as PaginatedResponse<Bookshelf>;
    },
  });
}
export function useCreateBookshelf() {
    return useMutation({
      mutationFn: async (data: {floor_id:string; zone_id: string;  booksCapacity: number; }) => {
        const response = await axios.post("/api/bookshelves", data, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        return response.data;
      },
    });
}

export function useUpdateBookshelf(bookshelfId: string) {
    return useMutation({
      mutationFn: async (data: {floor_id:string; zone_id: string;  booksCapacity: number;  }) => {
        const response = await axios.put(`/api/bookshelves/${bookshelfId}`, data, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        return response.data;
      },
    });
  }

  export function useDeleteBookshelf() {
    return useMutation({
      mutationFn: async (bookshelfId: string) => {
        await axios.delete(`/api/bookshelves/${bookshelfId}`, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
      },
    });
  }
