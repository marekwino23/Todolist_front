<template>
  <div class="home">
    <div class="login">
      <h2 style="color:white">Hello {{ email }} </h2>
      <img width="10%" style="margin-left: 77px" src='../../assets/vector1.png'>
      <input type="button" value="Logout" style="margin-top:228px" @click="Logout">
    </div>
    <div>
        <p class="todo">TODOLIST </p>
       <addTask></addTask>
       </div>
       <br>
       <br>
       <br>
       <br>
        <br>
        <div style="display: flow-root" v-for="list in lists" :key="list.task">
          {{ list.date }} - {{ list.task }} - status:{{list.status}}
          <input type="button" value="update" @click="updateTask(list,list.id)">
          <input type="button" style="margin-right: 5px;margin-bottom:5px " value="delete" @click="deleteTask(list,list.id)">
        </div>
      </div>
</template>

<script>

import addTask from './addTask'

export default {
  name: 'home',
  components:{addTask},
  data: function () {
    return {
      email: '',
      task: '',
      lists: [],
      id: '',
      tasks: '',
      date: '',
      formatDate: '',
    }
  },
  mounted() {
    this.email = sessionStorage.getItem('email')
    this.id = sessionStorage.getItem("id")
    this.tasks = fetch('http://localhost:8000/todo/getTasks/' + this.id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(tasks => {
          let i
          for (i = 0; i < tasks.items.length; i++) {
            console.log(tasks.items[i])
            this.lists.push(tasks.items[i])
          }
        })
  },

  methods: {
    Logout: function () {
      sessionStorage.clear()
      this.$swal("Logout successful")
      window.location.href = '/login'
    },
    updateTask: function(list){
      window.location.href='/update/' + list.id + '/' + list.task
    },
  
    deleteTask: function (list) {
       fetch('http://localhost:8000/todo/deleteTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "task_id": list.id,
          "id": this.id
        }),
      })
      window.location.href = '/home'
    },


    addTask: function () {
      window.location.href='/addTask'
  },
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: white;
}

.todo {
  color: black;
}

* {
  box-sizing: border-box;
}


.password {
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
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
  background-color: #45a049;
}

.container {
  border-radius: 5px;
  background-color: #36cec0;
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
