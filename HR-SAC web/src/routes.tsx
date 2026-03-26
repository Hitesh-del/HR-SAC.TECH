import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <HomePage />,
  },
  {
    name: 'About',
    path: '/about',
    element: <AboutPage />,
  },
  {
    name: 'Capabilities',
    path: '/capabilities',
    element: <CapabilitiesPage />,
  },
  {
    name: 'Case Studies',
    path: '/case-studies',
    element: <CaseStudiesPage />,
  },
  {
    name: 'Case Study Detail',
    path: '/case-studies/:id',
    element: <CaseStudiesPage />,
    visible: false,
  },
  {
    name: 'Insights',
    path: '/insights',
    element: <InsightsPage />,
  },
  {
    name: 'Blog Post',
    path: '/insights/:slug',
    element: <InsightsPage />,
    visible: false,
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <ContactPage />,
  },
  {
    name: 'Login',
    path: '/login',
    element: <LoginPage />,
    visible: false,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <AdminPage />,
    visible: false,
  },
];

export default routes;
