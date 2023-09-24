import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    
    const {isLoading, error, data: settings} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,// this should be a function which returns a async func or a promise

    });

    return { isLoading, error, settings };
}