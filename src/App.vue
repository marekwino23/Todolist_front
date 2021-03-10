<template>
  <div id="app">
    <header>
      <div v-if='status == false' class="nav">
          <button id="register" class="button"><router-link class="nav_reg" to="/register">{{msq}}</router-link></button>
          <button id="login" class="button"> <router-link class="nav_log"  to="/login">Login</router-link></button>
      </div>
    </header>
      <br>
      <br>
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',
  props:['msq'],
  data: function () {
    return {
     status: false,
    }
  },
  mounted() {
    console.log(this.status)
    if(sessionStorage.length) {
      this.status = sessionStorage.getItem("logged in")
    }
  },
}

</script>

<style>
#app {
  background-color: #37cec0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p{
  color:white;
  font-weight: bold;
}

.button {
  background-color: #37cec0;
  border: 3px solid white;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 29px;
}

.nav_reg{
  margin-left: 4px;
  text-decoration: none;
  color:white;
  font-weight: bold;
}

.nav_log{
  margin-left: 6px;
  text-decoration: none;
  color:white;
  font-weight: bold;
}
</style>
