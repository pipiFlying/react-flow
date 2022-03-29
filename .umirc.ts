import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/work', component: '@/pages/work/index' },
  ],
  fastRefresh: {},
});
