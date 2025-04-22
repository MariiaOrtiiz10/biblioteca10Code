import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";

export interface Loan{
    id: string;
    user_id:string;
    email:string;
    book_id:string;
    isbn:string;
    title:string;
    start_date: string;
    loan_duration:number;
    end_date:string;
    status:boolean;
    delayed_days:number;
    returned_at:string;
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

  interface UseLoanParams {
    search?: any[];
    page?: number;
    perPage?: number;
  }

export function useLoans({ search, page = 1, perPage = 10 }: UseLoanParams = {}) {
  return useQuery({
    queryKey: ["loans", { search, page, perPage }],
    queryFn: async () => {
      const { data: apiResponse } = await axios.get<ApiPaginatedResponse<Loan>>("/api/loans", {
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
      } as PaginatedResponse<Loan>;
    },
  });
}
export function useCreateLoan() {
    return useMutation({
      mutationFn: async (data: {email:string; isbn:string; loan_duration:number;}) => {
        const response = await axios.post("/api/loans", data, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        return response.data;
      },
    });
}

// export function useReturnLoan() {
//     return useMutation({
//         mutationFn: async (loanId: string) => {
//             const response = await axios.put(`/api/loans/${loanId}/return`, null, {
//                 headers: {
//                     'Accept': 'application/json',
//                     'X-Requested-With': 'XMLHttpRequest'
//                 }
//             });
//             return response.data;
//         },
//     });
// }


//   export function useReturnLoan() {
//     return useMutation({
//       mutationFn: async (loanId: string) => {
//         const formData = new FormData();
//         formData.append('_method', 'PUT');
//         const response = await axios.post(`/api/loans/${loanId}/return`, formData, {
//           headers: {
//             'Accept': 'application/json',
//             'X-Requested-With': 'XMLHttpRequest',
//           },
//         });

//         return response.data;
//       },
//     });
//   }


  export function useDeleteLoan() {
    return useMutation({
      mutationFn: async (loanId: string) => {
        await axios.delete(`/api/loans/${loanId}`, {
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
      },
    });
  }
