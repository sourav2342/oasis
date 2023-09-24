import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {

  const queryClient = useQueryClient();
    // editcabin
  const {mutate: updateUser, isLoading:isUpdating } = useMutation({
    mutationFn: UpdateCurrentUser ,
    onSuccess: ({ user }) => {
        toast.success('updated successfully');
        queryClient.setQueryData(["user"], user);
        queryClient.invalidateQueries({ queryKey: ["user"] });// invalidation causes re-fetching of updated data
        
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating}
}