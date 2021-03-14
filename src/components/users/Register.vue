<template>
  <div class="register">
    <div class="container">
      <form>
        <div class="row">
          <div class="col-25">
            <label>Name</label>
          </div>
          <div class="col-75">
            <input type="text" required v-model="name" placeholder="Your name..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Surname</label>
          </div>
          <div class="col-75">
            <input type="text" required v-model="surname" placeholder="Your surname..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Email</label>
          </div>
          <div class="col-75">
            <input type="text" required v-model="email" placeholder="Your email..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Check email</label>
          </div>
          <div class="col-75">
             <input type="button" class="button" :disabled="email === ''" @click="onCheck" v-model="check">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label>Password</label>
          </div>
          <div class="col-75">
            <input class="password" required v-model="password" min="8" placeholder="Your password..">
          </div>
        </div>
        <br>
        <div class="row">
          <input type="button" @click="onRegister" :disabled="check === 'busy' || check === 'check' || this.name === '' || this.surname === '' || this.password === ''" value="Register">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  props: {
    msg: String
  },
  data: function(){
    return {
      name: '',
      surname:'',
      email:'',
      check:'check',
      password:'',
      data:'',
    }
  },
  methods:{

 onCheck: function () {
   console.log(this.email)
     this.data = fetch('http://localhost:8000/auth/checkemail', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": this.email,
        }),
      })
       .then(response => response.json())
          .then(data => {
            if (data.status === "success") {
              this.check = "free"
              this.$swal.fire("email is free")
              console.log(this.check)
      }    else {
           this.$swal.fire("email is busy")
      }


          })
          },

    onRegister: function(event){
       fetch('http://localhost:8000/auth/register', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": this.name,
          "surname": this.surname,
          "email": this.email,
          "password": this.password,
        }),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data.message)
            if(data.message === "success"){
              this.$swal("User created successful")
              this.$router.push('login')
            }
            else{
              console.log("failed")
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
       event.preventDefault()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

p{
  color:white;
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

input[type=submit],[type=button] {
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
