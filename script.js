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
const theme = document.getElementById("changeTheme");
const sortTask = document.getElementById("sortTask");
const addTask = document.getElementById("addTask"); 
const delleteTask = document.getElementById("removeTask");
const taskList = document.getElementById("taskList");
const noTaskData = document.querySelectorAll(".noTask");
const gettingUserList = document.getElementById("writeInput"); //Task forms that used to create add task
//Option Menu (Board List)
const notStartedOption = document.getElementById("radioNotStarted");
const progressOption = document.getElementById("radioProgress");
const doneOption = document.getElementById("radioDone");
//Board menu
const notStarted = document.getElementById("boardNotStarted");
const progress = document.getElementById("boardProgress");
const done = document.getElementById("boardDone");

noTaskData.forEach(noTask => {
  noTask.textContent = "No Task Here";
})

function noTaskStatement(noTaskData, availableTask) {
  switch (availableTask.length) {
    case 0:
      noTaskData.forEach(changeCSS => {
        changeCSS.style.display = "flex";
      });
      break;
    default:
      noTaskData.forEach(changeCSS => {
        changeCSS.style.display = "none";
      });
  }
}

// Add Task Logic
