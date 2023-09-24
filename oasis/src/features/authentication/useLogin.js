import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login as loginApi } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

   const { mutate: login, isLoading } = useMutation({
        mutationFn: ({email, password}) => loginApi({email, password}),
        onSuccess: (user) => 
        {      
            // adding newly logged in user to cache of queryClient
        queryClient.setQueryData(['user'], user.user);
           toast.success("LogIn successfully ");
        //    console.log(user);
        //    console.log(user.user);
           navigate('/dashboard', { replace: true});
        },

        onError: err => {
            console.log('ERROR', err);
            toast.error("Provided password and email are incorrect");
        }

    });

    return { login, isLoading};
}