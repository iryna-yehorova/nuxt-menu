<template>
    <v-menu v-model="languageMenu" offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="text-capitalize" v-bind="attrs" v-on="on" text>
                <div v-if="$vuetify.breakpoint.mdAndUp">
                    {{ activeLang.name }}
                    <v-icon small right>mdi-menu-down</v-icon>
                </div>
                <div v-else> {{ activeLang.code }} </div>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item v-for="lang in locales" :key="lang.id" @click="handleMenuItemClick(lang)">
                <v-list-item-title>{{ lang.name }}</v-list-item-title>
            </v-list-item>              
        </v-list>
    </v-menu>
</template>

<script>
import * as dataApi from '../backend/dataApi'

export default {
   data: () => ({
    languageMenu: false,
    locales: [],
    loading: false,
    activeLang: {}
  }),
  created() {
      this.getLocales()
  },
  methods: {
    handleMenuItemClick (lang) {
        this.activeLang = lang;
        this.$emit('changeLang', this.activeLang.code)
    },
    async getLocales() {
        this.loading = true
        this.locales = await dataApi.getLocales();
        this.activeLang = this.locales.find(l => l.isDefault)
        this.$emit('changeLang', this.activeLang.code)
        this.loading = false
    }
  }
}
</script>

<style>

</style>