// Just easter egg in inspect menu
const asciiArt = `
  _____         _      ___ _               
 |_   _|_ _ ___| | __ | __| |_____      __
   | |/ _\` / __| |/ / | _|| |/ _ \\ \\ /\\ / /
   | | (_| \\__ \\   <  | | | | (_) \\ V  V / 
   |_|\\__,_|___/_|\\_\\ |_| |_|\\___/ \\_/\\_/  
`;

console.log(
  `%c${asciiArt}`,
  "color: #00FF00; font-weight: bold; font-family: monospace;"
);
console.log(
  "%c> Succefully Running Javascript (Taskflow WIP-RELEASE--BATCH-01)\n> Welcome To Task Flow! Ready to written your schedule today? ☕",
  "color: #00FF00; font-family: monospace; font-size: 12px;"
);

// WARN! IN JAVASCRIPT LOGIC MAJOR OF FILE IS CREATED BY AI THAT HAVE BEEN CURATED WITH USER 

//Getting the element from the element id in HTML
//Navbar element
const theme = document.getElementById("changeTheme");
const sortTask = document.getElementById("sortTask");
const deleteAllTask = document.getElementById("removeTask");
const exportToDo = document.getElementById("exportToDo");
const typedListBar = document.querySelector(".writeBar"); // What the user type about the list?
const addTask = document.getElementById("addTask"); // Adding a task
const gettingUserList = document.getElementById("writeInput"); //Task forms that used to create add task
//Board menu 

// Kanban board status 
const getStorageTask = JSON.parse(localStorage.getItem("kanbanStorageCache")) || [];
const statusContainer = {
  // Taking from the radio button value
  notStarted: document.getElementById("taskListNotStarted"),
  Progress: document.getElementById("taskListProgress"),
  Done: document.getElementById("taskListDone")
};

// Input length guard — prevents storage bloat
function validateInput(text) {
  if (text.length === 0) return { ok: false, reason: "empty" };
  if (text.length > 500) return { ok: false, reason: "too long" };
  return { ok: true };
}

//Task handling feature
function addTaskHandling(update) {
  console.log("Pressed add task handling"); // Debug 1
  if (update) update.preventDefault();
  const typedText = gettingUserList.value.trim();
  console.log("The person typed", typedText); // Debug 2

  // Validate before storing — raw text is safe because we use textContent on render
  const validation = validateInput(typedText);
  if (!validation.ok) {
    console.warn("Input rejected:", validation.reason);
    return;
  }

  const selectedStatus = document.querySelector('input[name="status"]:checked').value;

  // Validate status against known values to prevent tampered radio values
  const allowedStatuses = Object.keys(statusContainer);
  if (!allowedStatuses.includes(selectedStatus)) {
    console.warn("Invalid status value:", selectedStatus);
    return;
  }

  const createTask = {
    id: `task-${Date.now()}`,
    text: typedText, // store raw text — textContent handles escaping on render
    status: selectedStatus,
    dateCreated: new Date().toLocaleDateString(undefined, {day: 'numeric', month: 'short', year: 'numeric'})
  };
  console.log("Adding task time history :", createTask);

  getStorageTask.push(createTask);
  localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
  gettingUserList.value = "";
  letHimRender();
}

function letHimRender() {
  for (const status in statusContainer) {
    if (statusContainer[status]) {
      statusContainer[status].replaceChildren(); // clean DOM clear, no innerHTML
    }
  }
  getStorageTask.forEach(cardList => {
    const card = letHimCreateCard(cardList); // returns a real DOM element
    if (statusContainer[cardList.status]) {
      statusContainer[cardList.status].appendChild(card);
    }
  });
  letHimCheckUserSchedule();
  addDragListeners(); // Add drag and drop listeners after rendering
}

function letHimCreateCard(cardList) {
  // Build the card using DOM methods so user input is never parsed as HTML (XSS-safe)

  // Wrapper card
  const card = document.createElement('div');
  card.className = 'taskListCard';
  card.id = cardList.id;
  card.draggable = true;

  // Task name
  const nameCard = document.createElement('div');
  nameCard.className = 'nameCard';
  nameCard.title = 'Card Name';
  nameCard.style.cssText = 'font-size: 14pt;';
  const nameSpan = document.createElement('span');
  nameSpan.textContent = cardList.text; // textContent, never innerHTML
  nameCard.appendChild(nameSpan);

  // Task header (date + drag handle)
  const taskHeader = document.createElement('div');
  taskHeader.className = 'taskHeader';
  taskHeader.style.cssText = 'display: flex; justify-content: space-between;';

  const dateCreated = document.createElement('div');
  dateCreated.className = 'dateCreated';
  dateCreated.title = 'Date Created';
  dateCreated.style.cssText = 'font-size: 10pt; font-weight: 400;';
  const dateSpan = document.createElement('span');
  dateSpan.textContent = cardList.dateCreated; // textContent, never innerHTML
  dateCreated.appendChild(dateSpan);

  const dragHandle = document.createElement('div');
  dragHandle.className = 'dragHandle';
  dragHandle.title = 'Drag me';
  dragHandle.style.cssText = 'cursor: grab; color: var(--font); opacity: 0;';
  // SVG for drag handle is static markup, safe to use here
  dragHandle.innerHTML = `<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6h2v2H8V6zm0 5h2v2H8v-2zm0 5h2v2H8v-2zm6-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2z"></path></svg>`;

  taskHeader.appendChild(dateCreated);
  taskHeader.appendChild(dragHandle);

  // Button menu (delete + edit)
  const taskCardMenu = document.createElement('div');
  taskCardMenu.className = 'taskCardMenu';
  taskCardMenu.style.cssText = 'display: flex; justify-content: flex-end; gap: 8px;';

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'cardButton deleteBtn';
  deleteBtn.dataset.id = cardList.id; // safe attribute assignment
  deleteBtn.title = 'Edit Task';
  deleteBtn.style.cssText = 'background: linear-gradient(to top, var(--button-Gradient-1), var(--button-Gradient-2)); border-radius: 4px; padding: 5px; cursor: pointer;';
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zm9 16H6V8h12z"></path><path d="M14.29 10.29 12 12.59l-2.29-2.3-1.42 1.42 2.3 2.29-2.3 2.29 1.42 1.42 2.29-2.3 2.29 2.3 1.42-1.42-2.3-2.29 2.3-2.29z"></path></svg>`;

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'cardButton editBtn';
  editBtn.dataset.id = cardList.id; // safe attribute assignment
  editBtn.title = 'Delete Task';
  editBtn.style.cssText = 'background: linear-gradient(to top, var(--button-Gradient-1), var(--button-Gradient-2)); border-radius: 4px; padding: 5px; cursor: pointer;';
  editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path><path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path></svg>`;

  taskCardMenu.appendChild(deleteBtn);
  taskCardMenu.appendChild(editBtn);

  // Assemble the card
  card.appendChild(nameCard);
  card.appendChild(taskHeader);
  card.appendChild(taskCardMenu);

  return card; // returns a real DOM element
}

// If the board does not have any to do list
function letHimCheckUserSchedule() {
  for (const status in statusContainer) {
    const statusListIs = statusContainer[status];
    if (statusListIs && statusListIs.children.length === 0) {
      // Build with DOM methods — no innerHTML
      const noTask = document.createElement('div');
      noTask.className = 'noTask';
      noTask.textContent = 'No Task Here';
      statusListIs.appendChild(noTask);
    }
  }
}

// Delete individual task
function deleteTask(taskId) {
  const taskIndex = getStorageTask.findIndex(task => task.id === taskId);
  if (taskIndex > -1) {
    getStorageTask.splice(taskIndex, 1);
    localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
    letHimRender();
  }
}

// Edit task
function editTask(taskId) {
  const task = getStorageTask.find(t => t.id === taskId);
  if (!task) return;
  
  const newText = prompt("Edit your task:", task.text);
  if (newText === null) return; // User cancelled
  
  const trimmedText = newText.trim();
  const validation = validateInput(trimmedText);
  
  if (!validation.ok) {
    alert(validation.reason === "empty" ? "Task cannot be empty!" : "Task is too long (max 500 characters)!");
    return;
  }
  
  task.text = trimmedText;
  localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
  letHimRender();
}

// Drag and drop functionality
let draggedElement = null;

function handleDragStart(e) {
  draggedElement = e.currentTarget;
  e.currentTarget.style.opacity = '0.5';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.currentTarget.innerHTML);
}

function handleDragEnd(e) {
  e.currentTarget.style.opacity = '1';
  
  // Remove drag-over styles from all containers
  document.querySelectorAll('.taskList').forEach(container => {
    container.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  if (e.currentTarget.classList.contains('taskList')) {
    e.currentTarget.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  if (e.currentTarget.classList.contains('taskList')) {
    e.currentTarget.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  e.preventDefault();
  
  if (!draggedElement) return false;
  
  const dropZone = e.currentTarget;
  dropZone.classList.remove('drag-over');
  
  // Find which status container was dropped into
  let newStatus = null;
  for (const status in statusContainer) {
    if (statusContainer[status] === dropZone) {
      newStatus = status;
      break;
    }
  }
  
  if (newStatus && draggedElement) {
    const taskId = draggedElement.id;
    const task = getStorageTask.find(t => t.id === taskId);
    
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
      letHimRender();
    }
  }
  
  return false;
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
}

// Sort tasks functionality
let currentSortOrder = 'dateDesc'; // dateDesc, dateAsc, nameAsc, nameDesc

function sortTasks() {
  if (getStorageTask.length === 0) {
    alert("No tasks to sort!");
    return;
  }
  
  // Cycle through sort orders
  const sortOrders = ['dateDesc', 'dateAsc', 'nameAsc', 'nameDesc'];
  const currentIndex = sortOrders.indexOf(currentSortOrder);
  currentSortOrder = sortOrders[(currentIndex + 1) % sortOrders.length];
  
  // Sort the array based on current sort order
  getStorageTask.sort((a, b) => {
    switch(currentSortOrder) {
      case 'dateDesc':
        // Sort by creation timestamp (newest first)
        return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
      case 'dateAsc':
        // Sort by creation timestamp (oldest first)
        return parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1]);
      case 'nameAsc':
        // Sort alphabetically A-Z
        return a.text.localeCompare(b.text);
      case 'nameDesc':
        // Sort alphabetically Z-A
        return b.text.localeCompare(a.text);
      default:
        return 0;
    }
  });
  
  localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
  letHimRender();
  
  // Show feedback to user via console
  const sortMessages = {
    dateDesc: '📅 Sorted by date (newest first)',
    dateAsc: '📅 Sorted by date (oldest first)',
    nameAsc: '🔤 Sorted by name (A-Z)',
    nameDesc: '🔤 Sorted by name (Z-A)'
  };
  console.log(sortMessages[currentSortOrder]);
  
  // Visual feedback - briefly highlight the sort button
  if (sortTask) {
    sortTask.style.filter = 'brightness(140%)';
    setTimeout(() => {
      sortTask.style.filter = '';
    }, 200);
  }
}

// Delete all tasks functionality
function deleteAllTasks() {
  if (getStorageTask.length === 0) {
    alert("No tasks to delete!");
    return;
  }
  
  const confirmation = confirm(`Are you sure you want to delete all ${getStorageTask.length} tasks? This action cannot be undone.`);
  
  if (confirmation) {
    getStorageTask.length = 0; // Clear array
    localStorage.setItem("kanbanStorageCache", JSON.stringify(getStorageTask));
    letHimRender();
    console.log("All tasks deleted");
  }
}

// Export tasks to JSON
function exportTasks() {
  if (getStorageTask.length === 0) {
    alert("No tasks to export!");
    return;
  }
  
  const dataStr = JSON.stringify(getStorageTask, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(link.href), 100);
  
  console.log(`Exported ${getStorageTask.length} tasks`);
}

// Event delegation for delete and edit buttons
document.addEventListener('click', (e) => {
  // Handle delete button
  if (e.target.closest('.deleteBtn')) {
    const button = e.target.closest('.deleteBtn');
    const taskId = button.dataset.id;
    if (taskId) {
      const confirmation = confirm("Are you sure you want to delete this task?");
      if (confirmation) {
        deleteTask(taskId);
      }
    }
  }
  
  // Handle edit button
  if (e.target.closest('.editBtn')) {
    const button = e.target.closest('.editBtn');
    const taskId = button.dataset.id;
    if (taskId) {
      editTask(taskId);
    }
  }
});

// Add drag and drop event listeners when cards are rendered
function addDragListeners() {
  const cards = document.querySelectorAll('.taskListCard');
  cards.forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
  });
  
  // Add listeners to drop zones
  for (const status in statusContainer) {
    const container = statusContainer[status];
    if (container) {
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('dragenter', handleDragEnter);
      container.addEventListener('dragleave', handleDragLeave);
      container.addEventListener('drop', handleDrop);
    }
  }
}

// Event listeners
if (addTask) {
  addTask.addEventListener("click", addTaskHandling);
}
if (typedListBar) {
  typedListBar.addEventListener("submit", addTaskHandling);
}
if (theme) {
  theme.addEventListener("click", toggleTheme);
}
if (sortTask) {
  sortTask.addEventListener("click", sortTasks);
}
if (deleteAllTask) {
  deleteAllTask.addEventListener("click", deleteAllTasks);
}
if (exportToDo) {
  exportToDo.addEventListener("click", exportTasks);
}

// Initialize
loadTheme();
letHimRender();