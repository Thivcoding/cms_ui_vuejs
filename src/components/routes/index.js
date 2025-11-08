import { createRouter, createWebHistory } from "vue-router";
import ArticleDetail from "../page/articles/ArticleDetail.vue";
import ArticleList from "../page/articles/ArticleList.vue";
import CategoryArticles from "../page/categorys/CategoryArticles.vue";
import AboutUs from "../page/AboutUs.vue";
import Home from "../page/Home.vue";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/home',
        redirect: '/' 
    },
     {
        path: '/article',
        component: ArticleList,
        name: 'article'
    },
    {
        path: '/article/:slug',
        component: ArticleDetail,
        name: 'article'
    },
    {
        path: '/category/:id',
        component: CategoryArticles,
        name: 'category'
    },
    {
        path: '/aboutUs',
        component: AboutUs,
        name: 'about'
    },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
});
