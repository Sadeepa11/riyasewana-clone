import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import SearchResultsPage from '../pages/SearchResultsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AccountPage from '../pages/AccountPage';
import FavoritesPage from '../pages/FavoritesPage';
import EditProfilePage from '../pages/EditProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import AddVehiclePage from '../pages/AddVehiclePage';
import AddBikePage from '../pages/AddBikePage';
import AddBicyclePage from '../pages/AddBicyclePage';
import AddPartsPage from '../pages/AddPartsPage';
import LeasingOffersPage from '../pages/LeasingOffersPage';
import TermsPage from '../pages/TermsPage';
import ContactPage from '../pages/ContactPage';
import ContributePage from '../pages/ContributePage';
import VehicleDetailPage from '../pages/VehicleDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchResultsPage /> },
      { path: 'vehicle/:id', element: <VehicleDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'editprofile', element: <EditProfilePage /> },
      { path: 'changepass', element: <ChangePasswordPage /> },
      { path: 'add-vehicle', element: <AddVehiclePage /> },
      { path: 'add-bike', element: <AddBikePage /> },
      { path: 'add-bicycle', element: <AddBicyclePage /> },
      { path: 'add-parts', element: <AddPartsPage /> },
      { path: 'leasing-offers', element: <LeasingOffersPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'contribute', element: <ContributePage /> },
    ],
  },
]);
