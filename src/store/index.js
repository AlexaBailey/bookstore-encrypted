import { configureStore } from "@reduxjs/toolkit";
import { booksApi } from "./slices/api/booksApi";
import { categoriesApi } from "./slices/api/categoriesApi";
import { visitorsApi } from "./slices/api/visitorsApi";
import { employeesApi } from "./slices/api/employeesApi";
import { authApi } from "./slices/api/authApi";
import { studentsApi } from "./slices/api/studentsApi";
import { evaluationApi } from "./slices/api/evaluationApi";
import { professorsApi } from "./slices/api/professorApi";
import { groupApi } from "./slices/api/groupApi";
import { subjectsApi } from "./slices/api/subjectsApi";
import authReducer from "../store/slices/auth";

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [visitorsApi.reducerPath]: visitorsApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [studentsApi.reducerPath]: studentsApi.reducer,
    [evaluationApi.reducerPath]: evaluationApi.reducer,
    [professorsApi.reducerPath]: professorsApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [subjectsApi.reducerPath]: subjectsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      categoriesApi.middleware,
      visitorsApi.middleware,
      employeesApi.middleware,
      authApi.middleware,
      professorsApi.middleware,
      evaluationApi.middleware,
      studentsApi.middleware,
      groupApi.middleware,
      subjectsApi.middleware
    ),
});

export default store;
