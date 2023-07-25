import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../../features/auth/authSlice";
import { logout } from "../../../features/auth/authActions";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/token/refresh",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data));
      localStorage.setItem("accessToken", refreshResult.data.token);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: "/comments/add",
        method: "POST",
        body,
      }),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/delete`,
        method: "DELETE",
      }),
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/like`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = authApi;
