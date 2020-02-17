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
            <div class="row text-h5 q-mb-lg justify-center">Login to use the chat-bot</div>
            <div class="row q-mb-lg justify-center">
              <q-input style="width:70%;" v-model="email" name="email" outlined label="Email" />
            </div>
            <div class="row q-mb-lg justify-center">
              <q-input
                class="q-mb-lg"
                style="width:70%;"
                outlined
                label="Password"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                @keyup.enter="sendLoginRequest()"
                name="password"
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
                @click="sendLoginRequest()"
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
              <q-input v-model="email" style="width:70%;" name="email2" outlined label="Email" />
            </div>
            <div class="row q-mb-lg justify-center">
              <q-input
                v-model="password"
                class="q-mb-lg"
                style="width:70%;"
                outlined
                label="Password"
                name="password3"
              />
              <q-input
                v-model="password2"
                class="q-mb-lg"
                style="width:70%;"
                outlined
                label="Repeat Password"
                @keyup.enter="sendLoginRequest()"
                name="password4"
              />
            </div>
            <div class="row q-mb-sm justify-center">
              <q-btn
                style="background: goldenrod; color: white"
                label="SignUp"
                @click="sendSignupRequest()"
                :disable="queryLoading"
              />
              <q-spinner-pie v-if="queryLoading" style="font-size: 2.5em" color="orange" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!-- Alert dialog component -->
    <alert-dialog
      v-model="alertDialogVisible"
      :value="Boolean"
      :type="alertDialogType"
      :message="alertDialogMessage"
    />
  </q-page>
</template>

<script>
import AlertDialog from "../components/AlertDialog";

export default {
  name: "Auth",
  components: {
    "alert-dialog": AlertDialog
  },
  data() {
    return {
      tab: "login",
      password: null,
      password2: null,
      email: null,
      isPwd: true,
      queryLoading: false,
      alertDialogMessage: null,
      alertDialogType: null,
      alertDialogVisible: false
    };
  },
  methods: {
    validateForm() {
      if (!this.email || !this.password) {
        this.showAlertDialog(
          "Please fill required email and password.",
          "warning"
        );
        return false;
      }
      return true;
    },
    validateForm1() {
      if (!this.email || !this.password || !this.password2) {
        this.showAlertDialog(
          "Please fill required email and password.",
          "warning"
        );
        return false;
      }
      if (this.password != this.password2) {
        this.showAlertDialog("Passwords not matched!", "warning");
        return false;
      }
      return true;
    },
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
    showAlertDialog(message, type) {
      if (type == null) {
        type = "default";
      }
      this.alertDialogMessage = message;
      this.alertDialogType = type;
      this.alertDialogVisible = true;
    },
    sendAuthQueryRequest(url) {
      const self = this;

      const validate = this.validateForm();

      if (!validate) {
        return;
      }
      this.toggleLoadingState();
      // axios post request
      this.$api
        .post("auth/" + url, {
          email: self.email,
          password: self.password
        })
        .then(function(response) {
          self.toggleLoadingState();
          if (response.data.error == true) {
            self.showAlertDialog(response.data.message, "error");
          } else {
            const userId = response.data.userId;
            const userName = response.data.userName;
            self.showAlertDialog(response.data.message, "success");
            if (userId && userId != "") {
              // set session cookies
              self.$cookies.set("ypUserId", userId);
              self.$cookies.set("ypUserName", userName);
              window.location.replace("/#/");
            }
          }
        })
        .catch(function(error) {
          self.showAlertDialog(error, "error");
          self.toggleLoadingState();
        });
    }
  },
  created() {
    const userId = this.$cookies.get("ypUserId");
    if (userId && userId != "") {
      window.location.replace("/#/");
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 40%
</style>
