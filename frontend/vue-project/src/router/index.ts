import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Import views
// We'll create these components next
const Home = () => import('../views/Home.vue');
const BookingForm = () => import('../views/BookingForm.vue');
const MyBookings = () => import('../views/MyBookings.vue');
const BookingConfirmation = () => import('../views/BookingConfirmation.vue');
const NotFound = () => import('../views/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingForm,
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: MyBookings,
  },
  {
    path: '/booking-confirmation/:id',
    name: 'BookingConfirmation',
    component: BookingConfirmation,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // Always scroll to top when navigating
    return { top: 0 };
  },
});

export default router;
