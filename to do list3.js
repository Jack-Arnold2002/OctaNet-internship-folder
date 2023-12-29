let tasks = [];
let addedTasks = [];
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const deadlineInput = document.getElementById("deadlineInput");
  const timeInput = document.getElementById("timeInput");
  const priorityInput = document.getElementById("priorityInput");
  const task = {
    name: taskInput.value,
    deadline: deadlineInput.value,
    time: timeInput.value,
    priority: `Priority ${priorityInput.value}`
  };
  if (task.name === "") {
    alert("Please enter a task!");
    return;
  }
  addedTasks.push(task);
  displayAddedTasks();
  clearInputs();
}
    function displayTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong class="edit-task" data-index="${index}">${task.name}</strong>
            <span>Deadline: ${task.deadline}</span>
            <span>Time: ${task.time}</span>
            <span>Priority: ${task.priority}</span>
          `;
          li.onclick = () => showEditPopup(index);
          taskList.appendChild(li);
        });
        attachEditEventListeners();
      }
      function displayAddedTasks() {
        const addedTasksList = document.getElementById("addedTasksList");
        addedTasksList.innerHTML = "";
        addedTasks.forEach((task, index) => {
          let priorityLabel = task.priority; 
          if (task.priority === 'Priority 1') {
            priorityLabel = 'High Priority';
          }
          if (task.priority === 'Priority 2') {
            priorityLabel = 'Medium Priority';
          }
          if (task.priority === 'Priority 3') {
            priorityLabel = 'Low Priority';
          }
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="added-task-details">
              <strong>${task.name}</strong>
              <span>Deadline: ${task.deadline}</span>
              <span>Time: ${task.time}</span>
              <span>Priority: ${priorityLabel}</span>
            </div>
            <button class="edit-btn" onclick="showEditPopupForAddedTask(${index})">Edit</button>
          `;
          addedTasksList.appendChild(li);
        });
      }
function removeTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}
function clearInputs() {
  document.getElementById("taskInput").value = "";
  document.getElementById("deadlineInput").value = "";
  document.getElementById("priorityInput").value = "low";
}
function showEditPopupForAddedTask(index) {
  const task = addedTasks[index];
  const editPopupContainer = document.querySelector('.edit-popup-container');
  editPopupContainer.innerHTML = `
    <div class="edit-popup">
      <input type="text" id="editedTask" value="${task.name}">
      <input type="date" id="editedDeadline" value="${task.deadline}">
      <input type="time" id="editedtime" value="${task.time}">
      <select id="editedPriority">
        <option value="1" ${task.priority === 'High Priority' ? 'selected' : ''}>High Priority</option>
        <option value="2" ${task.priority === 'Medium Priority' ? 'selected' : ''}>Medium Priority</option>
        <option value="3" ${task.priority === 'Low Priority' ? 'selected' : ''}>Low Priority</option>
      </select>
      <div class="button-container">
      <button class="save-btn" onclick="updateAddedTask(${index})">Save</button>
      <button class="delete-btn" onclick="deleteAddedTask(${index})">Delete</button>
      <button class="cancel-btn" onclick="cancelEdit()">Cancel</button>
      </div>
    </div>
  `;
  editPopupContainer.classList.add('show');
}
function deleteAddedTask(index) {
  addedTasks.splice(index, 1);
  closeEditPopup();
  displayAddedTasks();
}
function updateAddedTask(index) {
  const editedTask = document.getElementById("editedTask").value;
  const editedDeadline = document.getElementById("editedDeadline").value;
  const editedPriority = document.getElementById("editedPriority").value;
  addedTasks[index].name = editedTask;
  addedTasks[index].deadline = editedDeadline;
  addedTasks[index].priority = `Priority ${editedPriority}`;
  closeEditPopup();
  displayAddedTasks();
}
function cancelEdit() {
  closeEditPopup();
}
function closeEditPopup() {
    const editPopupContainer = document.querySelector('.edit-popup-container');
    editPopupContainer.innerHTML = '';
    editPopupContainer.classList.remove('show');
  }
function attachEditEventListeners() {
  const editButtons = document.querySelectorAll('.edit-task');
  editButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      showEditPopup(index);
    });
  });
}