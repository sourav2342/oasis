import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";


export function  useDeleteBooking(){
const queryClient = useQueryClient();// we can access the queryClient instance using useQueryClient hook

  const { isLoading: isDeleting, mutate:deleteBooking } = useMutation({ // used for mutating state in this case deleting cabin 
    mutationFn: deleteBookingApi,
    onSuccess: ()=>{
      toast.success("booking successfully deleted");
      
      queryClient.invalidateQueries({ // we are invalidating queryClient to update cabin with new values in the ui
        queryKey: ['bookings'],// queryKey should be same as 
      })
    },
    onError: (err)=> toast.error(err.message),

  });

  return { isDeleting, deleteBooking};

}

