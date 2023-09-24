import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";


export function useBookings()
{
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  
  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === 'all' ? null : { field: "status" , value: filterValue };


  // SORTING
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //query
  const {
    isLoading,
    data: {data: bookings, count} = {},
    error
   } = useQuery({  // a custom hook within react query to fetch data in react app
     queryKey: ["bookings", filter, sortBy, page],// we can also fetch other tables from supabase and it is similar to dependency array to react query as bookings and filter value changes refetching happens
     queryFn: () => getBookings({ filter, sortBy, page }),
   });

   // PRE-FETCHING
   const pageCount = Math.ceil(count / PAGE_SIZE);
  
   //prefetching next page
   if(page < pageCount)
   queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page+1 ],// we can also fetch other tables from supabase and it is similar to dependency array to react query as bookings and filter value changes refetching happens
    queryFn: () => getBookings({ filter, sortBy, page:page+1 }),
   })

   // prefetching prev page
   if(page > 1)
   queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page-1 ],// we can also fetch other tables from supabase and it is similar to dependency array to react query as bookings and filter value changes refetching happens
    queryFn: () => getBookings({ filter, sortBy, page:page-1 }),
   })


   return { isLoading, bookings ,error, count };
}