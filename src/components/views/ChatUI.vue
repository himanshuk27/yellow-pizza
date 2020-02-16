<template>
  <q-page class="flex">
    <div class="column justify-between content-between">
      <q-scroll-area class="col-10 q-mt-sm">
        <div class="q-mx-xl row justify-center">
          <div style="width: 100%;">
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
            <q-chat-message :text="['hey, how are you?']" sent />
            <q-chat-message :text="['doing fine, how r you?']" />
          </div>
        </div>
      </q-scroll-area>
      <q-card flat bordered class="row">
        <q-card-section>
          <div class="row">
            <q-input outlined label="Type here..." style="width: 1160px;" />
            <q-btn color="red" icon-right="send" label="Send" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: "ChatUI"
};
</script>
