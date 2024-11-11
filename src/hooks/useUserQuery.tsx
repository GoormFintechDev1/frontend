import { getUserInfo } from "@/lib/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {

    return useQuery({
      queryKey: ['user'],
      queryFn: () => getUserInfo(),
    });
  };