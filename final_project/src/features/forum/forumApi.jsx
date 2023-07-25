import { authApi } from "../../app/services/auth/authService";

const forumApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getThreads: builder.query({
      query: () => ({
        url: "/threads",
        method: "GET",
      }),
    }),
    getThreadById: builder.query({
      query: (id) => ({
        url: `/threads/${id}`,
        method: "GET",
      }),
    }),
    createThread: builder.mutation({
      query: (body) => ({
        url: "/threads/create",
        method: "POST",
        body,
      }),
    }),
    deleteThread: builder.mutation({
      query: (id) => ({
        url: `/threads/${id}/delete`,
        method: "DELETE",
      }),
    }),
    searchThreads: builder.query({
      query: (value) => ({
        url: `/threads?search=${value}`,
        method: "GET",
      }),
    }),
    getPostsByThreadId: builder.query({
      query: (id) => ({
        url: `/posts?thread=${id}`,
        method: "GET",
      }),
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/posts/create",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetThreadsQuery,
  useGetThreadByIdQuery,
  useCreateThreadMutation,
  useDeleteThreadMutation,
  useSearchThreadsQuery,
  useGetPostsByThreadIdQuery,
  useAddPostMutation
} = forumApi;
