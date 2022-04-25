<template>
  <div>
    <v-app-bar
      color="blue"
      dark
    >
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Nuxt Menu</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-list class="d-flex py-0 " light color="blue" v-if="$vuetify.breakpoint.mdAndUp">
        <v-list-item
          v-for="(item, index) in list"
          :key="index"
        >
          <v-list-item-title class="white--text">{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <LanguageSwitcher @changeLang="getMenuData" />

    </v-app-bar>

    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-blue--text text--white"
        > 
          <v-list-item  v-for="(item, index) in list"  :key="index">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
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
      code: '',
      drawer: false,
      group: null,
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
  },
  mounted() {
    console.log(this.$vuetify.breakpoint)
  }
}
</script>
