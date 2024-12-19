import "./App.css";
import { CardScreen } from "./feature/card/CardScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TopScreen } from "./feature/top/TopScreen";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <TopScreen />,
    },
    {
      path: "/c/:id",
      element: <CardScreen />,
    },
  ],
  {
    basename: "/mycard",
  }
);

export default App;
