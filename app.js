// PUNTO DE ENTRADA
import { HomeController } from "./controllers/HomeController.js";

document.addEventListener("DOMContentLoaded", () => {
  const homeController = new HomeController();
  homeController.iniciar();
});
