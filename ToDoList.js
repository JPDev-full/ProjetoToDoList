const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tasks = [];

function displayTasks() {
  console.log("Lista de Tarefas:");
  tasks.forEach((task, index) => {
    console.log(`[${index}] ${task}`);
  });
  console.log();
}

function addTask(task) {
  try {
    if (task==="") {
      throw new Error("\nErro: A tarefa não pode estar vazia!\n")
    }
    tasks.push(task);
    console.log(`\n"${task}" foi adicionado à lista.`);
  } catch (e) {
    console.log(e.message)
  }
  
}

function editTask(id, updatedTask) {
 try {
    if (!(id != "" && id >= 0 && id < tasks.length && Number.isInteger(id) )){
      throw new Error(`\nErro: ID inválido.\n`);
    } 
    if (updatedTask === "") {
      throw new Error("\nErro: A atualização da tarefa não pode estar vazia!\n")
    }
    tasks[id] = updatedTask;
    console.log(`\nTarefa [${id}] atualizada para "${updatedTask}".`);
 } catch (e) {
      console.log(e.message)

 } 

}

function removeTask(id) {
  if (id >= 0 && id < tasks.length) {
    const removedTask = tasks.splice(id, 1);
    console.log(`\nTarefa [${id}] "${removedTask}" removida.`);
  } else {
    console.log(`ID inválido.`);
  }
}

function getTaskById(id) {
  if (id >= 0 && id < tasks.length) {
    return tasks[id];
  }
  return null;
}

function promptForAction() {
  rl.question(
    "Escolha uma opção:\n1 - Adicionar Tarefa\n2 - Editar Tarefa\n3 - Remover Tarefa\n4 - Listar Todas as Tarefas\n5 - Visualizar Tarefa Unica\n0 - Sair\n\nEscolha uma opção: ",
    (action) => {
      switch (action) {
        case "1":
          rl.question("Digite a nova tarefa: ", (task) => {
            addTask(task);
            displayTasks();
            promptForAction();
          });
          break;
        case "2":
          rl.question("Digite o ID da tarefa a ser editada: ", (id) => {
            rl.question("Digite a tarefa atualizada: ", (updatedTask) => {
              editTask(Number(id), updatedTask);
              displayTasks();
              promptForAction();
            });
          });
          break;
        case "3":
          rl.question("Digite o ID da tarefa a ser removida: ", (id) => {
            removeTask(Number(id));
            displayTasks();
            promptForAction();
          });
          break;
        case "4":
          displayTasks();
          promptForAction();
          break;
        case "5":
          rl.question("Digite o ID da tarefa que você quer obter: ", (id) => {
            const task = getTaskById(Number(id));
            console.log(`Tarefa [${id}]: ${task}`);
            console.log();
            promptForAction();
          });
          break;
        case "0":
          rl.close();
          break;
        default:
          console.log("Ação inválida. Tente novamente.");
          promptForAction();
      }
    }
  );
}

// Inicializa a aplicação
console.log("\n--------------------------");
console.log("Bem-vindo à ToDo List App!");
console.log("--------------------------");
promptForAction();
