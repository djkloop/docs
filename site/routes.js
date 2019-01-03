import Layout from './components/layout.vue'
import Iframe from './components/iframe.vue'
import demoRoutes from './demoRoutes'
import NProgress from 'nprogress'

const beforeEnter = (to, from, next) => {
  NProgress.start()
  next()
}
export default [
  { path: '/ant-design-vue/components',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/ant-design-vue/components/')[1].split('/')[0]
      return { name, showDemo: true }
    },
    children: demoRoutes.map((item) => ({
      ...item,
      beforeEnter,
    })),
  },
  { path: '/ant-design-vue/iframe',
    component: Iframe,
    children: demoRoutes.map((item) => ({
      ...item,
      props: (route) => {
        const hash = route.hash.replace('#', '')
        return { iframeName: hash }
      },
    })),
  },
  {
    path: '/ant-design-vue',
    component: Layout,
    props: (route) => {
      const name = route.path.split('/docs/vue/')[1].split('/')[0]
      return { name, showApi: true }
    },
    children: [],
  },
  { path: '/*', redirect: '/ant-design-vue/docs/vue/introduce/' },
]