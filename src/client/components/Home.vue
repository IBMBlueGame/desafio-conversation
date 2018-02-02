<template>
  <div class="container">
    <Logo :description="logoDescription" />
    <div class="wrapper">
      <div class="container-chat">
        <div class="history">
          <Message :type='message.type' :text="message.text" v-for="message in history" :key="message.timestamp"/>
          <div class="loading" v-show="isLoading"></div>
        </div>
        <div class="footer">
          <div class="text">
            <input v-model="currentMessage"/>
          </div>
          <div class="separator"></div>
          <div class="send-button" @click="talkToBot">
            <div>
              <span>Enviar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Logo from './Logo.vue';
import Message from './Message.vue';

export default {
  name: 'Home',
  data() {
    return {
      logoDescription: 'Desafio Chatbot',
      history: [],
      currentMessage: '',
      isLoading: false,
    };
  },
  methods: {
    scrollToEnd() {
      const container = this.$el.querySelector('.history');
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 200);
    },

    handleSuccess(response) {
      const { message, context } = response.data;
      const newMessage = {
        type: 'bot',
        text: message,
        timestamp: (new Date()).getTime(),
      };

      this.isLoading = false;
      this.lastContext = context;
      this.history.push(newMessage);
      this.scrollToEnd();
    },

    handleFail(error) {
      this.isLoading = false;
      console.log('error', error);

      const errorMessage = {
        type: 'bot',
        text: 'Humm... Houve um erro, tente novamente.',
        timestamp: (new Date()).getTime(),
      };

      this.history.push(errorMessage);
      this.scrollToEnd();
    },

    talkToBot() {
      if (this.currentMessage) {
        const newMessage = {
          type: 'user',
          text: this.currentMessage,
          timestamp: (new Date()).getTime(),
        };

        this.history.push(newMessage);
        this.scrollToEnd();

        const parameters = { message: this.currentMessage };
        if (this.lastContext) { parameters.context = this.lastContext; }

        this.isLoading = true;
        this.currentMessage = '';

        axios.post('/api/v1/chatbot', parameters)
          .then(this.handleSuccess)
          .catch(this.handleFail);
      }
      console.log(this.currentMessage);
    },

  },
  components: {
    Logo,
    Message,
  },
};
</script>

<style scoped>
  @import url(../colors.css);

  .loading {
    font-size: 30px;
    text-align: center;
  }

  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 2000ms infinite;
    animation: ellipsis steps(4,end) 2000ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }

  @keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  @-webkit-keyframes ellipsis {
    to {
      width: 1.25em;
    }
  }

  .container {
    display: flex;
    height: 80vh;
    align-items: center;
    color: var(--light-green);
  }

  .wrapper {
    height: calc(90% - 10vh);
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .history {
    height: 85%;
    overflow-y: auto;
    background: #00000091;
  }

  .container-chat {
    height: 95%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid var(--light-green);
  }

  .footer {
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid var(--light-green);
  }

  .footer > .text {
    height: 100%;
    width: 70%;
  }

  .footer > .text input {
    width: 100%;
    height: 90%;
    background: transparent;
    border: 0;
    color: var(--light-green);
    font-size: 1.2em;
    resize: none;
  }

  .footer > .separator {
    width: 1%;
    height: 100%;
    border-right: 1px solid var(--light-green);
  }

  .footer > .send-button {
    width: 29%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    cursor: pointer;
  }

  @media screen and (orientation: portrait) {
    .container {
      display: block;
      height: 80vh;
    }

    .footer > .send-button {
      font-size: 2em;
    }

    .footer > .text input {
      font-size: 2em;
    }

    .wrapper {
      width: auto;
    }
  }
</style>
