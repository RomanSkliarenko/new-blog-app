import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import postsReducer from "./posts/post-reducers";
import usersReducer from "./users/users.reducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
