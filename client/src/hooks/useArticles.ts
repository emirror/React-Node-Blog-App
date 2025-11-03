import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../tools/request";

export interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  userId: number;
  user?: {
    id: number;
    username: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleListResponse {
  articles: Article[];
  totals: number;
  page: number;
  pages: number;
  limit: number;
  offset: number;
}

export function useArticles(page: number = 1) {
  return useQuery<ArticleListResponse>({
    queryKey: ["articles", page],
    queryFn: async () => {
      const { data } = await request.get("/api/articles", {
        params: { page },
      });
      return data;
    },
  });
}

export function useArticle(id: number) {
  return useQuery<Article>({
    queryKey: ["article", id],
    queryFn: async () => {
      const { data } = await request.get(`/api/articles/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articleData: { title: string; content: string; image?: string }) => {
      const { data } = await request.post("/api/articles", articleData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...articleData
    }: {
      id: number;
      title: string;
      content: string;
      image?: string;
    }) => {
      const { data } = await request.put(`/api/articles/${id}`, articleData);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", variables.id] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await request.delete(`/api/articles/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}

