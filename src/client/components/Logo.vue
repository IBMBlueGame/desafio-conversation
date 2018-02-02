<template>
  <div class="container-logo">
    <div class="wrapper-logo">
      <div class="content">
        <div class="content-hacker">
          <img class="hacker" src="../assets/hacker.png" />
        </div>
        <div class="content-bluegame">
          <img class="bluegame" src="../assets/bluegame.png" />
          <div>
            <span class="description has-gradient">{{description}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script scoped>
export default {
  name: 'Logo',
  props: ['description'],
};
</script>

<style scoped>

  @import url("../colors.css");

  .container-logo {
    width: 40%;
    text-align: center;
    margin-top: 5vh;
  }

  .wrapper-logo {
    width: 100%;
  }

  .hacker {
    width: 80%;
    height: auto;
    opacity: 0.42;
  }

  .bluegame {
    width: 75%;
    height: auto;
  }

  .has-gradient {
    background: -webkit-linear-gradient(right, var(--light-blue), var(--light-green));
    background: -o-linear-gradient(right, var(--light-blue), var(--light-green));
    background: -moz-linear-gradient(right, var(--light-blue), var(--light-green));
    background: linear-gradient(to right, var(--light-blue),  var(--light-green));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    font-size: 1em;
    font-weight: 550;
  }

  @media screen and (orientation: portrait) {
    .container-logo {
      width: 100%;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .content-hacker {
      width: 40%;
    }

    .content-bluegame {
      width: 60%;
    }

    .bluegame {
      width: 90%;
    }

    .description {
      font-size: 1.5em;
    }
  }

</style>
