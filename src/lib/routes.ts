const publicRoutes = ['/'];
const authRoutes = ['/login', '/register', '/error'];
const apiPrefix = '/api/auth';
const DEFAULT_URL_REDIRECT = '/dashboard';

export const routes = {
  publicRoutes,
  authRoutes,
  apiPrefix,
  defaultRedirect: DEFAULT_URL_REDIRECT,
};