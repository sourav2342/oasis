import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {

  const queryClient = useQueryClient();
    // editcabin
  const {mutate: editCabin, isLoading:isEditing} = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),
    onSuccess: () => {
        toast.success('cabin successfully edited');
        queryClient.invalidateQueries({ queryKey: ["cabins"] });// invalidation causes re-fetching of updated data
        
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing}
}