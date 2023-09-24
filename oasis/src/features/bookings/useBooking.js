import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {

  const {bookingId } = useParams();
  
    const {
    isLoading,
    data:booking,
    error,
   } = useQuery({  // a custom hook within react query to fetch data in react app
     queryKey: ["booking", bookingId],// we can also fetch other tables from supabase
     queryFn: () => getBooking(bookingId),
   });

   return {isLoading, booking ,error};
}