const {
  Before, // Algo que que quiero que se haga antes de un escenario
  BeforeAll, // Antes de todos
  AfterAll, // Despues de todos
  After, // Despues de un escenario
  setDefaultTimeout
} = require('@cucumber/cucumber')
const { chromium } = require('playwright')

setDefaultTimeout(60000)

// launch the browser
BeforeAll(async () => { // lo primero de todos lanzas el navegador
  global.browser = await chromium.launch({
    headless: true, // que no se vea por pantalla
    slowMo: 5 // milisegundos entre accion y accion
  })
})

// close the browser
AfterAll(async () => { // Despues de todo cerrar el navegador
  await global.browser.close()
})

// Create a new browser context and page per scenario
Before(async () => { // Antes te crea un perfil de chrome y dentro, una nueva pagina
  global.context = await global.browser.newContext()
  global.page = await global.context.newPage()
})

// Cleanup after each scenario
After(async () => { // Despues de cada escenario cierra el perfil y la pagina
  await global.page.close()
  await global.context.close()
})
