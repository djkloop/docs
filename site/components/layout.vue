<script>
import AllDemo from '../demo'
import NProgress from 'nprogress'
const docsList = [
  { key: 'introduce', enTitle: 'Ant Design of Vue', title: 'Ant Design of Vue' },
  { key: 'getting-started', enTitle: 'Getting Started', title: '快速上手' },
  { key: 'use-with-vue-cli', enTitle: 'Use in vue-cli', title: '在 vue-cli 中使用' },
  { key: 'customize-theme', enTitle: 'Customize Theme', title: '定制主题' },
  { key: 'changelog', enTitle: 'Change Log', title: '更新日志' },
  { key: 'i18n', enTitle: 'Internationalization', title: '国际化' },
  { key: 'faq', enTitle: 'FAQ', title: '常见问题' },
  { key: 'sponsor', enTitle: 'Sponsor', title: '赞助我们' },
]
export default {
  data () {
    return {
    }
  },
  render () {
    return (
      <div class='page-wrapper'>
        <div>我是布局组件</div>
        <router-view></router-view>
      </div>
    )
  },
}
</script>