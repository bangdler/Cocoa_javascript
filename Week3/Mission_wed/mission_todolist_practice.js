
let add = document.querySelector(".add")
let newTask = document.querySelector(".newtask")

add.onclick = addTask;

function addTask() {
   document.querySelector(".tasks").innerHTML +=
       `<div class = "tasklist">
       <input class = "checkbox"; type = "checkbox";>
       <input class = "task"; type = "text"; value = "${newTask.value}"; readonly>
       <button class = "delete"; type = "button";>
            <i class="far fa-trash-alt"></i>
       </button>
   </div>`

    document.querySelector('checkBox').addEventListener('click', this.checkToggle);
    deleteTask();
}

function deleteTask() {
    let current_task = document.querySelectorAll(".delete");
    for (let i = 0; i < current_task.length; i++) {
        current_task[i].onclick = function() {
            this.parentNode.remove();
        }
    }
}

function checkToggle(event){
    let tasklist = event.target.parentNode;
    tasklist.classList.toggle('checktoggle')
}