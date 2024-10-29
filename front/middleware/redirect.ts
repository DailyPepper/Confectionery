import { navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
    return navigateTo('/admin');
});
