import { createInterface } from 'readline'
import chalk from 'chalk'
import fs from 'node:fs'

let tasks = []
const filePath = './tasks.json'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

function loadTasksFromFile() {
  try {
    tasks = []
    const tasksJson = fs.readFileSync(filePath, 'utf-8')
    const parsedData = JSON.parse(tasksJson)
    if (parsedData) tasks.push(...parsedData)
  } catch (error) {
    console.log(error)
  }
}

function saveTasksToFile() {
  const tasksJson = JSON.stringify(tasks, null, 2)
  fs.writeFileSync(filePath, tasksJson)
}

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
    saveTasksToFile()
    displayMenu()
    chooseOption()
  })
}

function listsTasks() {
  loadTasksFromFile()
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
      saveTasksToFile()
      displayMenu()
      chooseOption()
    }
  )
}

function chooseOption() {
  // TODO : borrar una tarea
  // TODO : editar una tarea
  // TODO : marcar como incompleta una tarea
  // TODO : ordenar tareas alfabeticamente
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

//Aqui agregamos la lectura del archivo JSON
loadTasksFromFile()

displayMenu()
chooseOption()
