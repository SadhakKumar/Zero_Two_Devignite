import "./App.css";
import MapboxComponent from "./components/MapboxCpmponent";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Home";
import { dark } from "@clerk/themes";
import Login from "./pages/Login";
import Onboarding from "./pages/OnBoarding";
import TripDetails from "./pages/TripDetails";
import GetPath from "./pages/GetPath";
import Plan from "./pages/Plan";
import CarModel from "./pages/CarModel";
import CarHomePage from "./pages/CarHomePage";

const router = createBrowserRouter([
  {
    path: "/source-path",
    element: <GetPath />,
  },
  {
    path: "plans",
    element: <Plan />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/onboarding/:id",
    element: <TripDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-review",
    element: <Add />,
  },
  {
    path: "/car-model",
    element: <CarModel />,
  },
  {
    path: "/carhomepage",
    element: <CarHomePage />,
  }
  // {
  //   path: "*",
  //   element: <Notfound />,
  // },
]);
function App() {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
        publishableKey={"pk_test_ZGVhci1za2luay05Ny5jbGVyay5hY2NvdW50cy5kZXYk"}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </>
  );
}

export default App;
