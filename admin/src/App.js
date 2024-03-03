import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Homepage';
import LoginPage from './pages/Login';

import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([


  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/homepage",
    element: <HomePage />,
  }
  
]);

function App() {
  return (
    <>
    <RouterProvider router={router} /></>
  );
}

export default App;
