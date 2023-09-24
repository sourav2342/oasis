import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins()
{
    const {
    isLoading,
    data:cabins,
    error,
   } = useQuery({  // a custom hook within react query to fetch data in react app
     queryKey: ["cabins"],// we can also fetch other tables from supabase
     queryFn: getCabins,
   });

   return {isLoading, cabins ,error};
}