import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";


export function  useDeleteClient(){
const queryClient = useQueryClient();// we can access the queryClient instance using useQueryClient hook

  const { isLoading: isDeleting, mutate:deleteCabin } = useMutation({ // used for mutating state in this case deleting cabin 
    mutationFn: deleteCabinApi,
    onSuccess: ()=>{
      toast.success("cabin successfully deleted");
      
      queryClient.invalidateQueries({ // we are invalidating queryClient to update cabin with new values in the ui
        queryKey: ['cabins'],// queryKey should be same as 
      })
    },
    onError: (err)=> toast.error(err.message),

  });

  return { isDeleting, deleteCabin};

}