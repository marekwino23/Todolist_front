<template>
    <div class="container">
      <div class="col-75">
        <input class="password" v-model="task" placeholder="Write new task">
        <input type="button" @click="addTask()" value="Add">
        <br>
        <br>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
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

  methods: {
    addTask: function () {
      this.date = new Date()
      this.id = sessionStorage.getItem('id')
      this.formatDate = this.date.toJSON().slice(0, 10).replace(/-/g, '-')
       fetch('http://localhost:8000/todo/addTask', {
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
            if (data.message === "success") {
              this.$swal("Task added")
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
