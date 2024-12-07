import defaultRoutes from './default.js';
import authRoutes from './auth.js';
import cabinetRoutes from './cabinet.js';
import toolsRoutes from './tools.js';

export const routes = [
    ...defaultRoutes,
    ...authRoutes,
    ...cabinetRoutes,
    ...toolsRoutes,
];
