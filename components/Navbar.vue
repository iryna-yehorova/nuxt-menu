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
          <v-menu v-if="item.submenu && item.submenu.length > 0" offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                light
                text
                v-bind="attrs"
                v-on="on"
                @click="$router.push({ name: item.route, params: { [item.route]: item.slug }})"
                class="white--text"
              >
                {{ item.name}}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(subItem, index) in item.submenu"
                :key="index"
              >
                <NuxtLink :to="{ name: item.route + '/' + subItem.route, params: { [item.route]: item.slug, [subItem.route]: subItem.route }}">{{ subItem.name }}</NuxtLink>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-else light text @click="$router.push({ name: item.route, params: { [item.route]: item.slug }})" class="white--text">
            {{ item.name }}
          </v-btn>
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
      list: [
        { route: 'index' },
        { route: 'book' },
        { route: 'service', 
          subroutes: [
            { route: 'event' },
            { route: 'transfer' },
            { route: 'tour' },
            { route: 'hour' },
          ] 
        },
        { route: 'blog' },
        { route: 'about' }
      ],
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
      const res = await dataApi.getMenuItems(code);

      //common ancestor for localization variants could be added to the api
      this.list = this.list.map((item, index) => {
        
        return {
          ...item,
          slug: res[index].slug,
          name: res[index].name,
          id: res[index].id,
          submenu: res[index].sub_menus && res[index].sub_menus.length > 0
            ? item.subroutes.map((sub, i) => {
              return {
                ...sub,
                slug: res[index].sub_menus[i].slug,
                name: res[index].sub_menus[i].name,
              }
            })
            : []
        }
      })

      this.code = code;
    },

  }
}
</script>
