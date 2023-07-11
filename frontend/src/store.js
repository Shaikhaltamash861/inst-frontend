import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userSlice from './reducers/userReducers'
import searchSlice from "./reducers/searchSlice";
import  followSlice  from "./reducers/friendsSlice";
import postSlice from './reducers/postReducer'
import myFriSlice from './reducers/myFriends'
import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
  };
  const rootReducer = combineReducers({  user:userSlice,
    searchedUser:searchSlice,
    friends:followSlice,
    post:postSlice,
    myFriends:myFriSlice
   });

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
//  const store=configureStore({
//     reducer:{

//         user:userSlice,
//         searchedUser:searchSlice
//     }
// })
export const persistor = persistStore(store)