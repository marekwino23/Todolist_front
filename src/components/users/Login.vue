<template>
  <div class="login">
    <div class="container">
    <form>
      <div class="row">
        <div class="col-25">
          <label>Email</label>
        </div>
        <div class="col-75">
          <input type="text" v-model="email" placeholder="Your email..">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label>Password</label>
        </div>
        <div class="col-75">
          <input class="password" v-model="password" placeholder="Your password..">
        </div>
      </div>
      <br>
      <div class="row">
        <input type="button" @click="onLogin" value="Login">
      </div>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function(){
    return {
      email:'',
      password:'',
    }
  },
  methods:{
    onLogin: function(){
    fetch('http://localhost:8000/auth/login', {
    method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.email,
        "password": this.password,
      }),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          if(data.error === "fatal error"){
            this.$swal("email is not exist in database")
          }
          else if(data.message === "wrong password"){
            this.$swal("wrong password")
          }
          else if(data.message === "success"){
            sessionStorage.setItem('email', this.email)
            sessionStorage.setItem('password', this.password)
            sessionStorage.setItem('logged in', true)
            sessionStorage.setItem('id', data.id )
            this.$swal("logged successful")
            window.location.href = '/home'
          }
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  color:white;
}

* {
  box-sizing: border-box;
}

.password{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit], [type=button] {
  background-color: #37cec0;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
