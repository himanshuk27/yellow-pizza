<template>
  <q-page class="flex">
    <div class="column justify-between content-between">
      <!-- Chat bubbles scroll area -->
      <q-scroll-area ref="chatArea" class="col-md-10 q-mt-sm">
        <div class="q-mx-xl row justify-center">
          <div style="width: 100%;" v-for="chat in chats" :key="chat.id">
            <q-chat-message :text="[chat.message]" :sent="chat.sent" />
            <!-- Chat pics div -->
            <div v-if="chat.urls" :scrollFunction="scrollToBottom()">
              <div class="q-pa-md">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-1" v-for="(url, pizzaName) in chat.urls" :key="pizzaName">
                    <q-img :src="url"></q-img>
                    {{ pizzaName }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- loading chat bubble div -->
        <q-chat-message
          v-if="queryLoading == true"
          class="q-ml-xl"
          text-color="white"
          bg-color="primary"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </q-scroll-area>
      <q-card flat bordered class="row">
        <q-card-section>
          <div class="row">
            <q-input
              v-model="chatTextInput"
              outlined
              label="Type here..."
              style="width: 1150px;"
              @keyup.enter="sendChatMessage()"
              class="q-mr-sm"
            />
            <q-btn color="red" icon-right="send" label="Send" @click="sendChatMessage()" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import Uuid from "uuid";

export default {
  name: "ChatUI",
  data() {
    return {
      queryLoading: false,
      chatTextInput: null,
      sessionId: null,
      chats: [],
      cart: []
    };
  },
  created() {
    const userId = this.$cookies.get("ypUserId");
    let userChats = this.$cookies.get("ypChats");
    if (userChats) {
      this.chats = JSON.parse(userChats);
    }

    if (!userId || userId == "") {
      window.location.replace("/#/auth");
    }

    if (this.chats.length < 1) {
      this.chats.push({
        message: "Hello user, you can start by asking for menu",
        sent: false,
        urls: null
      });
    }
    this.sessionId = Uuid.v4();
    const cartCookies = this.$cookies.get("ypCart");
    if (cartCookies) {
      const cartItems = cartCookies.split(",");
      this.cart = Object.values(cartItems);
    }
  },
  methods: {
    toggleLoadingState() {
      this.queryLoading = !this.queryLoading;
    },
    scrollToBottom() {
      if (this.$refs.chatArea) {
        this.$refs.chatArea.setScrollPosition(
          this.$refs.chatArea.$el.scrollHeight,
          1
        );
      }
    },
    async addItemsToCart(items) {
      this.cart = items;
      this.$cookies.set("ypCart", items.join());
      this.$emit("cart", items);
    },
    async sendChatMessage(query = null) {
      const self = this;
      const userId = this.$cookies.get("ypUserId");
      let inputQuery = query;

      if (!this.chatTextInput || this.chatTextInput == "") {
        return;
      }

      if (!query) {
        this.chats.push({
          message: this.chatTextInput,
          sent: true
        });
        inputQuery = this.chatTextInput;
      }

      this.toggleLoadingState();

      this.$api
        .post("send", {
          query: inputQuery,
          sessionId: this.sessionId,
          userId,
          cartItems: this.cart
        })
        .then(function(response) {
          self.toggleLoadingState();
          if (response.data.cartItems) {
            self.addItemsToCart(response.data.cartItems);
          }
          self.chatTextInput = null;
          self.chats.push({
            message: response.data.message,
            sent: false,
            urls: response.data.image
          });
          self.scrollToBottom();
          self.sessionId = response.data.sessionId;
          self.$cookies.set("ypChats", JSON.stringify(self.chats));
        })
        .catch(function() {
          self.toggleLoadingState();
          self.chats.push({
            message: "Fatal Error: Unable to connect to backend server.",
            sent: false,
            urls: null
          });
        });
    }
  }
};
</script>
