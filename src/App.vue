<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background: #F9CA06">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>Yello Pizza</q-toolbar-title>
        <q-btn flat icon="shopping_cart" :label="'Cart('+ shoppingCart.length + ')'">
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item v-for="item in shoppingCart" :key="item.id" clickable>
                <q-item-section>{{ item }}</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn flat small label="Logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <router-link to="/">Home</router-link>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <router-link to="/track">Track Order</router-link>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <!-- Router page container -->
    <q-page-container>
      <router-view @cart="updateCart"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      leftDrawerOpen: false,
      shoppingCart: []
    };
  },
  methods: {
    updateCart(cart) {
      this.shoppingCart = cart;
    },
    logout() {
      this.$cookies.remove("ypUserId");
      this.$cookies.remove("ypUserName");
      this.$cookies.remove("ypChats");
      window.location.href = "/#/auth";
    }
  }
};
</script>

<style>
</style>
