import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const profileAdapter = createEntityAdapter({})

const initialState = profileAdapter.getInitialState()

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: () => ({
        url: '/profile',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      transformResponse: responseData => { //responseData is from the query
        const loadedProfile = responseData.map(profile => {
          profile.id = profile._id
          return profile
        });
        return profileAdapter.setAll(initialState, loadedProfile)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST'},
            ...result.ids.map(id => ({ type: 'User', id }))
          ]
        }
        else return [{ type: 'User', id: 'LIST'}] 
      }
    }),
  })
})


export const {
  useGetProfileQuery
} = profileApiSlice

export const selectProfileResult = profileApiSlice.endpoints.getProfile.select()

export const selectProfileData = createSelector(
  selectProfileResult,
  profileResult => profileResult.data
)

export const {
  selectAll: selectAllProfile,
  selectById: selectProfileById,
  selectIds: selectProfileIds
} = profileAdapter.getSelectors(state => selectProfileData(state) ?? initialState)