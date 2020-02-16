<template>
  <q-page class="flex">
    <div class="column justify-between content-between">
      <!-- Chat bubbles scroll area -->
      <q-scroll-area ref="chatArea" class="col-10 q-mt-sm">
        <div class="q-mx-xl row justify-center">
          <div style="width: 100%;" v-for="chat in chats" :key="chat.id">
            <q-chat-message :text="[chat.message]" :sent="chat.sent" />
            <!-- Chat pics div -->
            <div v-if="chat.urls" :scrollFunction="scrollToBottom()">
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
    scrollToBottom() {
      this.$refs.chatArea.setScrollPosition(
        this.$refs.chatArea.$el.scrollHeight,
        1
      );
    },
    async sendChatMessage() {
      const self = this;

      this.chats.push({
        message: this.chatTextInput,
        sent: true
      });

      this.toggleLoadingState();

      this.$api
        .post("send", {
          query: this.chatTextInput,
          sessionId: this.sessionId
        })
        .then(function(response) {
          self.chatTextInput = null;
          self.chats.push({
            message: response.data.message,
            sent: false,
            urls: response.data.image
          });
          self.scrollToBottom();
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
