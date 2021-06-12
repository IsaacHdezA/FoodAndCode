import Vue from "vue";
import VueRouter from "vue-router";
import Table from "../views/Table.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/table",
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/order",
    name: "Order",
    component: () => import("../views/Order.vue"),
  },
  {
    path: "/food",
    name: "Food",
    component: () => import("../views/Food.vue"),
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import("../views/Employee.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
