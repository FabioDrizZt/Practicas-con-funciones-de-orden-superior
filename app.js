import { createInterface } from 'readline'
import chalk from 'chalk'

const tasks = []

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function displayMenu() {
  console.log(chalk.yellow.bold(' To Do App '))
  console.log(chalk.blueBright('Menu de Opciones:'))
  console.log('1. Agregar tarea')
  console.log('2. Listar tareas')
  console.log('3. Completar tarea')
  console.log('4. Salir')
  console.log('\n')
}

function addTask() {
  rl.question(chalk.bgMagentaBright('Escribe la tarea: '), (task) => {
    tasks.push({ task, completed: false })
    console.log(chalk.greenBright('Tarea agregada'))
    displayMenu()
    chooseOption()
  })
}

function listsTasks() {
  tasks.forEach((task, index) => {
    let status = task.completed ? '✅' : '❌'
    if (task.completed) {
      console.log(chalk.greenBright(`${index + 1}. ${status} - ${task.task}`))
    } else {
      console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`))
    }
  })
  displayMenu()
  chooseOption()
}

function completeTask() {
  rl.question(
    chalk.bgMagentaBright('Digita el número de la tarea a completar: '),
    (taskNumber) => {
      const index = parseInt(taskNumber) - 1
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true
        console.log(chalk.greenBright('Tarea completada'))
      } else {
        console.log(chalk.redBright('Tarea no encontrada'))
      }
      displayMenu()
      chooseOption()
    }
  )
}

function chooseOption() {
  rl.question('Ingresa el número de tu opción:', (choice) => {
    switch (choice) {
      case '1':
        addTask()
        break
      case '2':
        listsTasks()
        break
      case '3':
        completeTask()
        break
      case '4':
        console.log(chalk.yellow('Adiós 👋🏻'))
        rl.close()
        break
      default:
        console.log(chalk.red('Opción Inválida, Intenta nuevamente \n'))
        displayMenu()
        chooseOption()
        break
    }
  })
}

displayMenu()
chooseOption()
