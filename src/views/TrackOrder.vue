<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Login" name="login" />
        <q-tab label="SignUp" name="signup" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <div class="column">
            <div class="row text-h5 q-mb-lg justify-center">Lodsat-bot</div>
            <div class="row q-mb-lg justify-center">
              <q-input style="width:70%;" v-model="email" outlined label="Email" />
            </div>
            <div class="row q-mb-lg justify-center">
              <q-input
                class="q-mb-lg"
                style="width:70%;"
                outlined
                label="Password"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="row q-mb-sm justify-center">
              <q-btn
                class="q-mr-sm"
                style="background: goldenrod; color: white"
                @click="sendLoginRequest"
                label="Login"
                :disable="queryLoading"
              />
              <q-spinner-pie v-if="queryLoading" style="font-size: 2.5em" color="orange" />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="signup">
          <div class="column">
            <div class="row text-h5 q-mb-lg justify-center">Enter your email for signup</div>
            <div class="row q-mb-lg justify-center">
              <q-input style="width:70%;" outlined label="Email" />
            </div>
            <div class="row q-mb-lg justify-center">
              <q-input class="q-mb-lg" style="width:70%;" outlined label="Password" />
              <q-input class="q-mb-lg" style="width:70%;" outlined label="Repeat Password" />
            </div>
            <div class="row q-mb-sm justify-center">
              <q-btn
                style="background: goldenrod; color: white"
                label="SignUp"
                @click="sendSignupRequest"
                :disable="queryLoading"
              />
              <q-spinner-pie v-if="queryLoading" style="font-size: 2.5em" color="orange" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "TrackOder",
  data() {
    return {
      tab: "login",
      password: null,
      email: null,
      isPwd: true,
      queryLoading: false
    };
  },
  methods: {
    toggleLoadingState() {
      this.queryLoading = !this.queryLoading;
    },
    // send login query to backend server
    sendLoginRequest() {
      this.sendAuthQueryRequest("login");
    },
    // send signup query to backend server
    sendSignupRequest() {
      this.sendAuthQueryRequest("signup");
    },
    sendAuthQueryRequest(url) {
      const self = this;
      this.toggleLoadingState();
      // axios post request
      this.$api
        .post("auth/" + url, {
          email: self.email,
          password: self.password
        })
        .then(function(response) {
          // set session cookies
          if (response.data.userId) {
            alert(response.data.message);
            self.$cookies.set("ypUserId", response.data.message);
          }
          console.log("TCL: sendLoginRequest -> self", response.data);
          self.toggleLoadingState();
        })
        .catch(function(error) {
          console.log(error);
          self.toggleLoadingState();
        });
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 40%
</style>
