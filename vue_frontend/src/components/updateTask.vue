<template>
  <div class="home">
    <div class="login">
      <p>Update Task</p>
    </div>
    <div class="container">
      <div class="col-75">
        <br>
        <p class="todo">TODOLIST </p>
        <input class="password" v-model="task" :placeholder=tasks.task>
        <select v-model="status" name="status" id="status">
          <option >inprogress</option>
          <option >done</option>
        </select>
        <date-picker style="margin-top: 15px" v-model="date" valueType="format"></date-picker>
        <br>
        <br>
        <input type="button" @click="updateTask()" value="Update">
        <input type="button" @click="onBack()" style="margin-right:18px" value="Back">
        <br>
      </div>
    </div>
  </div>
</template>

<script>

import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'home',
  components: {DatePicker},
  data: function () {
    return {
      task: '',
      data: '',
      task_id:'',
      id: '',
      status:'',
      tasks: '',
      date: '',
      formatDate: '',
    }
  },
  mounted() {
    this.task_id = this.$route.params.id
    this.id = sessionStorage.getItem("id")
     fetch('http://localhost:8000/getownTask/' + this.id + '/' + this.task_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          let i;
          for (i = 0; i < data.items.length; i++) {
            console.log(data.items[i])
            this.tasks = data.items[i]
            console.log(this.tasks)
          }
        })
  },

  methods: {
    onBack: function (){
      this.$router.push('/home')
    },
    updateTask:function() {
      console.log(this.status)
      fetch('http://localhost:8000/updateTask', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "task_id": this.task_id,
          "id": this.id,
          "status": this.status,
          "task": this.task,
          "date": this.date,
        }),
      })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if (data.info === "update success") {
              window.location.href = '/home'
            }
          })
    },


    deleteTask: function (list) {
      console.log(list.id)
      this.data = fetch('http://localhost:8000/deleteTask', {
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
      this.date = new Date()
      this.formatDate = this.date.toJSON().slice(0, 10).replace(/-/g, '-')
      this.data = fetch('http://localhost:8000/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "task": this.task,
          "id": this.id,
          "formatDate": this.formatDate,
        }),
      })
          .then(response => response.json())
          .then(data => {
            if (data.info === "success") {
              this.$swal("Task updated")
              window.location.href = "/home"
            } else {
              console.log("failed")
            }
          })
    },
  },
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
  margin-top: 19px;
}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  margin-top: 18px;
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
