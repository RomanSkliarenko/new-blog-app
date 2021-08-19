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

// import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import postsReducer from "./posts/post-reducers";
import usersReducer from "./users/users.reducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

// const store = createStore(persistedRootReducer, composeWithDevTools());
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
