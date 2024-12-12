import { UserInfo } from "@/interface/user";
import {create} from "zustand";


interface UserStore {
  user: UserInfo;
  setUser: (user: UserInfo) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: {
    name: "",
    phoneNumber: "",
    email: "",
    brNum:  "",
    address:  "",
    businessStartDate:  "",
    companyName:  "",
    createAt: "",
  },
  setUser: (user) => set({ user }), // 상태 업데이트 함수
}));
