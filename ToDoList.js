const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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
    tasks.push(task);
    console.log(`"${task}" foi adicionado à lista.`);
}

function editTask(id, updatedTask) {
    if (id >= 0 && id < tasks.length) {
        tasks[id] = updatedTask;
        console.log(`Tarefa [${id}] atualizada para "${updatedTask}".`);
    } else {
        console.log(`ID inválido.`);
    }
}

function removeTask(id) {
    if (id >= 0 && id < tasks.length) {
        const removedTask = tasks.splice(id, 1);
        console.log(`Tarefa [${id}] "${removedTask}" removida.`);
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
    rl.question('Escolha uma ação (add/edit/remove/list/get/quit): ', (action) => {
        switch (action) {
            case 'add':
                rl.question('Digite a nova tarefa: ', (task) => {
                    addTask(task);
                    displayTasks();
                    promptForAction();
                });
                break;
            case 'edit':
                rl.question('Digite o ID da tarefa a ser editada: ', (id) => {
                    rl.question('Digite a tarefa atualizada: ', (updatedTask) => {
                        editTask(Number(id), updatedTask);
                        displayTasks();
                        promptForAction();
                    });
                });
                break;
            case 'remove':
                rl.question('Digite o ID da tarefa a ser removida: ', (id) => {
                    removeTask(Number(id));
                    displayTasks();
                    promptForAction();
                });
                break;
            case 'list':
                displayTasks();
                promptForAction();
                break;
            case 'get':
                rl.question('Digite o ID da tarefa que você quer obter: ', (id) => {
                    const task = getTaskById(Number(id));
                    console.log(`Tarefa [${id}]: ${task}`);
                    console.log();
                    promptForAction();
                });
                break;
            case 'quit':
                rl.close();
                break;
            default:
                console.log('Ação inválida. Tente novamente.');
                promptForAction();
        }
    });
}

// Inicializa a aplicação
console.log('Bem-vindo à ToDo List App!');
promptForAction();
