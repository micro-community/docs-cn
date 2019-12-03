<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header v-if="lang !== 'play'"></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="lang !== 'play' && !isComponent"></main-footer>
  </div>
</template>

<script>
  import { use } from '../src/locale';
  import zhLocale from '../src/locale/lang/zh-CN';
  import enLocale from '../src/locale/lang/en';

  const lang = 'zh-CN';
  const localize = lang => {
    if (lang === 'zh-CN') {
      use(zhLocale);
    } else {
      use(enLocale);
    }
  };
  localize(lang);

  export default {
    name: 'app',

    computed: {
      lang() {
        return 'zh-CN';
      },
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      }
    },

    watch: {
      lang(val) {
        localize(val);
      }
    },

    mounted() {
      localize(this.lang);
    }
  };
</script>
