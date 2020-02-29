<template>
  <q-page class="flex flex-center">
    <!-- Login Card -->
    <q-card class="auth-card">
      <q-card-section>
        <div class="row text-h6 justify-center">
          Login to use the chat-bot
        </div>
      </q-card-section>
      <!-- Login card tab -->
      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="Login" name="login" />
        <q-tab label="Signup" name="signup" />
      </q-tabs>

      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <!-- Login tab content -->
        <q-tab-panel name="login">
          <!-- email input -->
          <div class="row justify-center q-mt-lg q-mb-lg">
            <q-input
              style="width:70%;"
              v-model="email"
              name="email"
              outlined
              label="Email"
            />
          </div>
          <!-- password input -->
          <div class="row justify-center q-mb-lg">
            <q-input
              class="q-mb-lg"
              style="width:70%;"
              outlined
              label="Password"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              @keyup.enter="sendLoginRequest()"
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
          <!-- login button -->
          <div class="row justify-center">
            <q-btn
              class="q-mr-sm"
              style="background: goldenrod; color: white"
              @click="sendLoginRequest()"
              label="Login"
              :disable="queryLoading"
            />
            <q-spinner-pie
              v-if="queryLoading"
              style="font-size: 2.5em"
              color="orange"
            />
          </div>
        </q-tab-panel>
        <!-- signup tab -->
        <q-tab-panel name="signup">
          <!-- email input -->
          <div class="row justify-center q-mt-lg q-mb-lg">
            <q-input
              v-model="email"
              style="width:70%;"
              name="email2"
              outlined
              label="Email"
            />
          </div>
          <!-- password 1 input -->
          <div class="row justify-center">
            <q-input
              class="q-mb-sm"
              style="width:70%;"
              outlined
              label="Password"
              v-model="password2"
              :type="isPwd ? 'password' : 'text'"
              name="password3"
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
          <div class="row justify-center">
            <!-- password 2 input -->
            <q-input
              class="q-mb-lg"
              style="width:70%;"
              outlined
              label="Repeat Password"
              v-model="password3"
              :type="isPwd ? 'password' : 'text'"
              @keyup.enter="sendSignupRequest()"
              name="password4"
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
          <!-- signup button -->
          <div class="row justify-center">
            <q-btn
              style="background: goldenrod; color: white"
              label="SignUp"
              @click="sendSignupRequest()"
              :disable="queryLoading"
            />
            <q-spinner-pie
              v-if="queryLoading"
              style="font-size: 2.5em"
              color="orange"
            />
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
      password3: null,
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
      if (!this.email || !this.password2 || !this.password3) {
        this.showAlertDialog(
          "Please fill required email and password.",
          "warning"
        );
        return false;
      }
      if (this.password2 != this.password3) {
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
      const validate = this.validateForm();

      if (!validate) {
        return;
      }
      this.sendAuthQueryRequest();
    },
    // send signup query to backend server
    sendSignupRequest() {
      const validate = this.validateForm1();

      if (!validate) {
        return;
      }
      this.sendAuthQueryRequest(true);
    },
    showAlertDialog(message, type) {
      if (type == null) {
        type = "default";
      }
      this.alertDialogMessage = message;
      this.alertDialogType = type;
      this.alertDialogVisible = true;
    },
    sendAuthQueryRequest(signup = false) {
      const self = this;
      this.toggleLoadingState();
      const url = signup ? "/auth/signup" : "/auth/login";
      const password = signup ? this.password3 : this.password;
      // axios post request
      this.$api
        .post(url, {
          email: self.email,
          password
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
.auth-card
  width: 80%
  max-width: 600px

.text-input
  width: 100%
  max-width: 400px
</style>
