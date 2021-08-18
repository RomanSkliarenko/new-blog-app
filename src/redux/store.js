import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postsReducer from "./posts/post-reducers";
import usersReducer from "./users/users.reducer";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  // blacklist: ["auth"],
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(persistedRootReducer, composeWithDevTools());
const persistor = persistStore(store);
const exportStore = { store, persistor };
export default exportStore;
