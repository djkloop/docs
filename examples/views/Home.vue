<template>
  <div class="home">
    <div class="margin-30">
      <a-aleart></a-aleart>
    </div>
    <div class="margin-30">
      <a-button></a-button>
    </div>
    <div class="margin-30">
      <t-button></t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {}
</script>
<style>
.margin-30 {
  margin: 30px 0;
}
</style>

