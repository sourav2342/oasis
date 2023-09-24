import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {

  const queryClient = useQueryClient();
    // editcabin
  const {mutate: updateSetting, isLoading:isUpdating} = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
        toast.success('cabin successfully edited');
        queryClient.invalidateQueries({ queryKey: ["settings"] });// invalidation causes re-fetching of updated data
        
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting }
}