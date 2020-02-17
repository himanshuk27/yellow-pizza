<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="column">
          <div class="row text-h5 q-mb-lg justify-center">Track Order</div>
          <q-separator />
          <div class="row q-mb-lg justify-center">
            <q-input
              style="width:70%;"
              v-model="inputOrderId"
              name="orderId"
              outlined
              label="Order Id"
              @keyup.enter="sendTrackOrderQuery"
            />
          </div>

          <div v-if="order" class="row justify-center">
            <div v-for="item in orderItems" :key="item.orderId"></div>
            <q-card class="order-card">
              <img :src="'../assets/img/'+ item + '.jpg'" />

              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="primary" name="local_bar" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ item }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="red" name="local_gas_station" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ order.status }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
          <div class="row q-mb-sm justify-center">
            <q-btn
              class="q-mr-sm"
              style="background: red; color: white"
              label="Track Order Status"
              :disable="queryLoading"
              @click="sendTrackOrderQuery"
            />
            <q-spinner-pie v-if="queryLoading" style="font-size: 2.5em" color="orange" />
          </div>
        </div>
      </q-card-section>
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
  name: "TrackOrder",
  components: {
    "alert-dialog": AlertDialog
  },
  data() {
    return {
      inputOrderId: null,
      isPwd: true,
      queryLoading: false,
      alertDialogMessage: null,
      alertDialogType: null,
      alertDialogVisible: false,
      order: null,
      orderItems: null
    };
  },
  methods: {
    toggleLoadingState() {
      this.queryLoading = !this.queryLoading;
    },
    validateForm() {
      if (!this.inputOrderId || this.inputOrderId == "") {
        this.showAlertDialog("Please enter your order id.", "warning");
        return false;
      }
      return true;
    },
    showAlertDialog(message, type) {
      if (type == null) {
        type = "default";
      }
      this.alertDialogMessage = message;
      this.alertDialogType = type;
      this.alertDialogVisible = true;
    },
    sendTrackOrderQuery() {
      const self = this;
      const validate = this.validateForm();

      if (!validate) {
        return;
      }

      this.toggleLoadingState();
      // axios post request
      this.$api
        .post("order/track", {
          orderId: self.inputOrderId
        })
        .then(function(response) {
          self.toggleLoadingState();
          if (response.data.error == true) {
            self.showAlertDialog(response.data.message, "error");
          } else {
            self.order = response.data.order;
            self.orderItems = response.data.order.items;
          }
        })
        .catch(function(error) {
          self.showAlertDialog(error, "error");
          self.toggleLoadingState();
        });
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 40%
.order-card
  width: 40%
  height: 20%
</style>
