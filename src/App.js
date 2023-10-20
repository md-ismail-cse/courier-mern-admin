import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Prices from "./pages/prices/Prices";
import Parcels from "./pages/parcels/Parcels";
import Contact from "./pages/contacts/Contacts";
import SingleContact from "./pages/contacts/SingleContact";
import SingleParsel from "./pages/parcels/SingleParsel";
import Customers from "./pages/customers/Customers";
import SingleCustomer from "./pages/customers/SingleCustomer";
import Riders from "./pages/riders/Riders";
import SingleRider from "./pages/riders/SingleRider";
import AddRider from "./pages/riders/AddRider";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import Admin from "./pages/admin/Admin";
import AddAdmin from "./pages/admin/AddAdmin";
import Branches from "./pages/branches/Branches";
import AddBranch from "./pages/branches/AddBranch";
import Profile from "./pages/profile/Profile";
import AddPrice from "./pages/prices/AddPrice";
import EditPrice from "./pages/prices/EditPrice";
import EditBranch from "./pages/branches/EditBranch";
import EditDetails from "./pages/profile/EditDetails";
import ChangePassword from "./pages/profile/ChangePassword";
import ChangePicture from "./pages/profile/ChangePicture";

function App() {
  const Layout = () => {
    return localStorage.getItem("aToken") ? (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <Login />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/prices",
          element: <Prices />,
        },
        {
          path: "/prices/add-price",
          element: <AddPrice />,
        },
        {
          path: "/prices/edit-price/:id",
          element: <EditPrice />,
        },
        {
          path: "/branches",
          element: <Branches />,
        },
        {
          path: "/branches/add-branch",
          element: <AddBranch />,
        },
        {
          path: "/branches/edit-branch/:id",
          element: <EditBranch />,
        },
        {
          path: "/parcels",
          element: <Parcels />,
        },
        {
          path: "/parcels/:id",
          element: <SingleParsel />,
        },
        {
          path: "/contacts",
          element: <Contact />,
        },
        {
          path: "/contacts/:id",
          element: <SingleContact />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/customers/:id",
          element: <SingleCustomer />,
        },
        {
          path: "/riders",
          element: <Riders />,
        },
        {
          path: "/riders/:id",
          element: <SingleRider />,
        },
        {
          path: "/riders/add-rider",
          element: <AddRider />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/add-admin",
          element: <AddAdmin />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/edit-details",
          element: <EditDetails />,
        },
        {
          path: "/profile/change-picture",
          element: <ChangePicture />,
        },
        {
          path: "/profile/change-password",
          element: <ChangePassword />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
