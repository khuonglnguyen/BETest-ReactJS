import withHook from "@hooks/withHook";
import { PATH } from "@constants/paths";
import * as React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Loading from "@components/Loading/Loading";

const HomePage = React.lazy(() => import("src/pages/Home/Home"));
const LoginPage = React.lazy(() => import("src/pages/Login/Login"));
const UserPage = React.lazy(() => import("src/pages/User/User"));
const TaskPage = React.lazy(() => import("src/pages/Task/Task"));

class AppRoutes extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  public render(): React.ReactNode {
    const [token, setToken] = this.props.useState;
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path={PATH.LOGIN}
            element={
              <React.Suspense fallback={<Loading />}>
                <LoginPage />
              </React.Suspense>
            }
          ></Route>
          <Route
            path={PATH.HOME}
            element={
              <React.Suspense fallback={<Loading />}>
                <TaskPage />
              </React.Suspense>
            }
          ></Route>
          <Route
            path={PATH.TASK}
            element={
              <React.Suspense fallback={<Loading />}>
                <TaskPage />
              </React.Suspense>
            }
          ></Route>
          <Route
            path={PATH.USER}
            element={
              <React.Suspense fallback={<Loading />}>
                {localStorage.getItem("jwt") !== null ? (
                  <UserPage />
                ) : (
                  <LoginPage></LoginPage>
                )}
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default withHook(AppRoutes, [
  { useHook: React.useState, hookName: "useState", value: null },
]);
