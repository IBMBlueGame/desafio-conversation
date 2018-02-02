<template>
  <div class="container-message" :class="containerClass">
    <div class="chat-info" :class="chatInfoClass" v-if="isBotType()"></div>
    <div class="box" :class="boxClass">
      {{text}}
    </div>
    <div class="chat-info" :class="chatInfoClass" v-if="isUserType()"></div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: ['type', 'text'],

    methods: {
      isUserType() {
        return this.type === 'user';
      },

      isBotType() {
        return this.type === 'bot';
      },
    },

    computed: {
      containerClass: function() { // eslint-disable-line
        return {
          sent: this.isUserType(),
          received: this.isBotType(),
        };
      },
      boxClass: function() { // eslint-disable-line
        return {
          user: this.isUserType(),
          bot: this.isBotType(),
        };
      },
      chatInfoClass: function() { // eslint-disable-line
        return {
          'user-info': this.isUserType(),
          'bot-info': this.isBotType(),
        };
      },
    },
  };
</script>

<style scoped>
  @import url('../colors.css');

  .container-message {
    display: flex;
    padding: 5px;
  }

  .container-message.sent {
    justify-content: flex-end;
    text-align: right;
    color: var(--light-blue);
  }
  
  .container-message.sent > .message {
    border: 1px solid var(--light-blue);
  }

  .container-message.received {
    justify-content: flex-start;
    text-align: left;
    color: var(--light-green);
  }

  .container-message.received > .message {
    border: 1px solid var(--light-green);
  }

  .box {
    width: 65%;
    margin: 2vh auto;
    padding: 3vh;
    text-align: center;
    color: #fff;
    position: relative;
    font-size: 1.2em;
    word-wrap: break-word;
    margin-top: 6vh;
  }

  .box.user {
    background: var(--light-blue);
    border: 1px solid var(--light-bllue);
  }

  .box.bot {
    background: var(--light-green);
    border: 1px solid var(--light-green);
  }


  .user:before {
    content: "";
    position: absolute;
    border-left: 9px solid var(--light-blue);
    border-right: 10px solid transparent;
    border-top: 11px solid var(--light-blue);
    border-bottom: 9px solid transparent;
    right: -18px;
    top: 0px;
  }

  .bot:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 9px solid transparent;
    border-right: 10px solid var(--light-green);
    border-top: 11px solid var(--light-green);
    border-bottom: 9px solid transparent;
    left: -18px;
    top: -1px;
  }

  .chat-info {
    font-size: 1.5em;
  }

  .chat-info {
    width: 5vw;
    height: 5vw;
  }

  .chat-info.user-info {
    background: url('../assets/user.svg');
    background-size: contain;

  }

  .chat-info.bot-info {
    background: url('../assets/bot.svg');
    background-size: contain;
  }

  .message {
    width: 70%;
    padding: 5px;
    font-size: 1.2em;
    border-radius: 6px;
  }

  .history {
    height: 85%;
    overflow-y: auto;
  }

  @media screen and (orientation: landscape) {

    .box {
      font-size: 0.6em;
    }

    .container-message {
      width: 75%;
    }

    .container-message.sent {
      margin-left: 20%;
    }

    .container-message.received {
      margin-left: 5%;
    }
  }

  @media screen and (orientation: portrait) {
    .box, .message {
      font-size: 2em;
      margin-top: 2vh;
    }

    .chat-info {
      width: 8vw;
      height: 8vw;
    }

  }


</style>
