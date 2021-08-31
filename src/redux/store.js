import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import currentAuthUserSlice from "./users/users.reducer";
import loadingSlice from "./loading/loadingReducer";
// import postsReducer from "./posts/post-reducers";
// import logger from "redux-logger";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  // posts: postsReducer,
  user: currentAuthUserSlice,
  loading: loadingSlice,
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  // .concat(logger),
  devTools: process.env.NODE_ENV === "development",
});
const persistor = persistStore(store);
const exportStore = { store, persistor };
export default exportStore;
