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

//Getting the element from the element id in HTML
//Navbar element
// const theme = document.getElementById("changeTheme");
// const sortTask = document.getElementById("sortTask");
// const delleteTask = document.getElementById("removeTask");
// const taskList = document.getElementById("taskList");
// const noTaskData = document.querySelectorAll(".noTask");
const typedListBar = document.querySelector(".writeBar"); // What the user type about the list?
const addTask = document.getElementById("addTask"); // Adding a task
const gettingUserList = document.getElementById("writeInput"); //Task forms that used to create add task
//Board menu
// const notStarted = document.getElementById("boardNotStarted");
// const progress = document.getElementById("boardProgress");
// const done = document.getElementById("boardDone");

// Kanban board status 
const getStorageTask = JSON.parse(localStorage.getItem("kanbanStorageCache")) || [];
const statusContainer = {
  notStarted: document.getElementById("taskListNotStarted"),
  progress: document.getElementById("taskListProgress"),
  done: document.getElementById("taskListDone")
};

// Basic safety method
function sanitizeHTML(checkingString) {
  const safeList = document.createElement('div');
  safeList.textContent = checkingString;
  return safeList.innerHTML;
}

//Task handling feature
function addTaskHandling(update) {
  console.log("Pressed add task handling"); // Debug 1
  if (update) update.preventDefault();
  const typedText = gettingUserList.value.trim();
  console.log("The person typed", typedText); // Debug 2
  if(!typedText) {
    gettingUserList.style.opacity = "0.5";
    gettingUserList.style.placeholder = "No task here!";
    gettingUserList.value = "";

    setTimeout(() => {
      gettingUserList.style.opacity = "1";
      gettingUserList.placeholder = "Type to write the to do list";
    }, 2000);
    return;
  }
  const safeHandling = sanitizeHTML(typedText);
  const selectedStatus = document.querySelector('input[name="status"]:checked').value;
  const createTask = {
    id: `task-${Date.now}`,
    text: safeHandling,
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
  for(const status in statusContainer) {
    if(statusContainer[status]) {
      statusContainer[status].innerHTML = "";
    }
  }
  getStorageTask.forEach(cardList => {
    const card = letHimCreateCard(cardList);
    if (statusContainer[cardList.status]) {
      statusContainer[cardList.status].insertAdjacentHTML('beforeend', card);
    }
  });
  letHimCheckUserSchedule();
}

function letHimCreateCard(cardList) {
  return `
          <div class="taskListCard" id="${cardList.id}" draggable="true">
              
              <div class="nameCard" style="
              font-size: 14pt;
              " title="Card Name">
              <span>${cardList.text}</span></div>

              <div class="taskHeader" 
              style="
              display: flex; 
              justify-content: space-between; ">
                  <div class="dateCreated" style="
                  font-size: 10pt;
                  font-weight: 400;
                  " title="Date Created"><span>${cardList.dateCreated}</span></div>
                  <div class="dragHandle" 
                  style="
                  cursor: grab; 
                  color: var(--font); 
                  opacity: 0;" 
                  title="Drag me">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M8 6h2v2H8V6zm0 5h2v2H8v-2zm0 5h2v2H8v-2zm6-10h2v2h-2V6zm0 5h2v2h-2v-2zm0 5h2v2h-2v-2z"></path></svg>
                  </div>
              </div>
              
              <div class="taskCardMenu" 
              style="
              display: flex; 
              justify-content: flex-end; 
              gap: 8px;">
                  <button type="button" class="cardButton deleteBtn" data-id="${cardList.id}" title="Edit Task" 
                  style="
                  background: linear-gradient(to top, var(--button-Gradient-1), var(--button-Gradient-2));
                  border-radius: 4px; 
                  padding: 5px; 
                  cursor:pointer;">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zm9 16H6V8h12z"></path><path d="M14.29 10.29 12 12.59l-2.29-2.3-1.42 1.42 2.3 2.29-2.3 2.29 1.42 1.42 2.29-2.3 2.29 2.3 1.42-1.42-2.3-2.29 2.3-2.29z"></path>
                    </svg></button>
                  <button type="button" class="cardButton editBtn" data-id="${cardList.id}" title="Delete Task" 
                  style="
                  background: linear-gradient(to top, var(--button-Gradient-1), var(--button-Gradient-2));
                  border-radius: 4px; 
                  padding: 5px; 
                  cursor:pointer;">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
                    fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path><path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path>
                    </svg></button>
              </div>
          </div>
      `;
}

// If the board does not have any to do list
function letHimCheckUserSchedule() {
  for (const status in statusContainer) {
    const statusListIs = statusContainer[status];
    if (statusListIs && statusListIs.children.length === 0) {
      statusListIs.innerHTML = `<div class="noTask">No Task Here</div>`;
    } 
  }
}

if (addTask) {
  addTask.addEventListener("click", addTaskHandling);
}
if (typedListBar) {
  typedListBar.addEventListener("submit", addTaskHandling);
}

letHimRender();
