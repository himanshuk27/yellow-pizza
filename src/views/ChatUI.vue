<template>
  <q-page class="flex">
    <div class="column justify-between content-between">
      <q-scroll-area class="col-10 q-mt-sm">
        <div class="q-mx-xl row justify-center">
          <div style="width: 100%;" v-for="chat in chats" :key="chat.id">
            <q-chat-message :text="[chat.message]" :sent="chat.sent" />
            <div v-if="chat.urls">
              <div class="q-pa-md">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-1" v-for="url in chat.urls" :key="url.id">
                    <q-img :src="url"></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
      <q-card flat bordered class="row">
        <q-card-section>
          <div class="row">
            <q-input
              v-model="chatTextInput"
              outlined
              label="Type here..."
              style="width: 1160px;"
              @keyup.enter="sendChatMessage()"
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
      chats: []
    };
  },
  created() {
    this.sessionId = Uuid.v4();
  },
  methods: {
    toggleLoadingState() {
      this.queryLoading = !this.queryLoading;
    },
    async sendChatMessage() {
      const self = this;
      self.chats.push({
        message: self.chatTextInput,
        sent: true
      });

      self.toggleLoadingState();

      this.$api
        .post("send", {
          query: this.chatTextInput,
          sessionId: this.sessionId
        })
        .then(function(response) {
          self.toggleLoadingState();
          self.chatTextInput = null;
          self.chats.push({
            message: response.data.message,
            sent: false,
            urls: response.data.image
          });
          self.sessionId.response.data.sessionId;
        })
        .catch(function(error) {
          console.log(error);
          self.toggleLoadingState();
        });
    }
  }
};
</script>
