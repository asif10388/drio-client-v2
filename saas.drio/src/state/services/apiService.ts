import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type FormData = {};

type APIResponse = {
  id: string;
  role: string;
  email: string;
  userName: string;
  otherUserInfo: string;
  someSessionIdentifier: string;
};

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://779f508a-ad6b-4ed1-a232-dc0f458ca58c.mock.pstmn.io/api/v1`,
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/login`,
          method: "POST",
          body: credentials,
        }),
      }),

      setLDAP: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ldap`,
          method: "POST",
          body: credentials,
        }),
      }),

      setGoogleAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/google-auth`,
          method: "POST",
          body: credentials,
        }),
      }),

      setOAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/oauth`,
          method: "POST",
          body: credentials,
        }),
      }),

      resetPassword: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/reset-password`,
          method: "POST",
          body: credentials,
        }),
      }),

      addAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/saas/add-account`,
          method: "POST",
          body: credentials,
        }),
      }),

      editAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/saas/edit-account`,
          method: "POST",
          body: credentials,
        }),
      }),

      editOrgAccount: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/edit-org`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountGoogle: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/google`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountOAuth: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/oauth`,
          method: "POST",
          body: credentials,
        }),
      }),

      addOrgAccountLDAP: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/add-org/ldap`,
          method: "POST",
          body: credentials,
        }),
      }),

      fetchDDXLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ddx/fetch-license`,
          method: "POST",
          body: credentials,
        }),
      }),

      updateDDXLicense: builder.mutation<APIResponse, FormData>({
        query: (credentials) => ({
          url: `/ddx/update-license`,
          method: "POST",
          body: credentials,
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSetLDAPMutation,
  useSetOAuthMutation,
  useAddAccountMutation,
  useEditAccountMutation,
  useResetPasswordMutation,
  useSetGoogleAuthMutation,
  useEditOrgAccountMutation,
  useAddOrgAccountGoogleMutation,
  useAddOrgAccountOAuthMutation,
  useAddOrgAccountLDAPMutation,
  useUpdateDDXLicenseMutation,
  useFetchDDXLicenseMutation,
} = rootApi;
