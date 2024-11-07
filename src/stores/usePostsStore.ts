import { create } from "zustand";
import { persist } from "zustand/middleware";

// stores/itemStore.ts
interface PostType {
  id: number;
  title: string;
  price: number;
  time: string;
}

interface PostsStore {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
    }),
    {
      name: 'posts-storage',
    }
  )
);
