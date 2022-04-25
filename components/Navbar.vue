<template>
  <v-card>
    <v-app-bar
      absolute
      color="blue"
      dark
    >
      <v-app-bar-title>Nuxt Menu</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-list class="d-flex py-0 " light color="blue">
        <v-list-item
          v-for="(item, index) in list"
          :key="index"
        >
          <v-list-item-title class="white--text">{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <LanguageSwitcher @changeLang="getMenuData"/>

    </v-app-bar>
  </v-card>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'
import * as dataApi from '../backend/dataApi'

export default {
  components: {
    LanguageSwitcher
  },
  data() {
    return {
      list: [],
      code: ''
    }
  },
  methods: {
    async getMenuData(code) {
      if (this.code === code) {
        return
      }
      
      this.list = await dataApi.getMenuItems(code);
      this.code = code;
    }
  }
}
</script>
