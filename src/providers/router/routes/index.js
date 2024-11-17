import defaultRoutes from './default.js';
import authRoutes from './auth.js';

export const routes = [
    ...defaultRoutes,
    ...authRoutes,
];
