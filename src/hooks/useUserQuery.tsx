import { getUserInfo } from "@/lib/userApi";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = () => {
  // const setUser = useUserStore((state) => state.setUser);

  return useQuery({
      queryKey: ['user'],
      queryFn: () => getUserInfo(),
      // staleTime: 1000 * 60 * 60,
      // gcTime: 1000 * 60 * 60,
  });

  // setUser(data);
  
};

