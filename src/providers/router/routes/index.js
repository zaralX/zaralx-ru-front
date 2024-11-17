import defaultRoutes from './default.js';
import authRoutes from './auth.js';
import cabinetRoutes from './cabinet.js';

export const routes = [
    ...defaultRoutes,
    ...authRoutes,
    ...cabinetRoutes,
];
