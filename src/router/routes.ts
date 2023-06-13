import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'UserManage',
        path: 'user-manage',
        component: () => import('pages/member-user/UserManage.vue'),
      },
      {
        name: 'Home',
        path: 'home',
        component: () => import('pages/Home.vue'),
      },
      {
        name: 'CharacterManage',
        path: 'character-manage',
        component: () => import('pages/member-character/CharacterManage.vue'),
      },
    ],
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('pages/member-account/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
