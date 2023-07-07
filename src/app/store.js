import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)//Without using setupListeners() or a similar mechanism, if multiple users are using the app simultaneously and one user makes changes that should be reflected on other users' screens, those changes might not be automatically propagated to other users.
//In a typical scenario without real-time updates, when one user makes changes, those changes would only affect their local state or their own view of the app. Other users would not automatically receive those changes and their views would remain unaffected.
//However, if you implement real-time updates using mechanisms like subscriptions, websockets, or other technologies, you can establish connections between the clients (users) and the server. This would enable the server to send updates to all connected clients whenever there are changes that should be reflected on their screens. In this case, using setupListeners() or a similar approach can help handle those updates and automatically update the state of the app for all connected users.
