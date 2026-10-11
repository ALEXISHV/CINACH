// CONTROLADOR ,conecta el modelo con la vista no genera HTML ni toca el DOM directamente.
import { Pelicula } from "../models/Pelicula.js";
import { PeliculaView } from "../views/PeliculaView.js";

export class HomeController {
  constructor() {
    this.peliculas = Pelicula.obtenerTodas();
    this.vista = new PeliculaView();
  }

  async iniciar() {
    this.configurarEventos();
    this.vista.mostrarPeliculas(this.peliculas);

    // Primero se muestran las tarjetas de respaldo y luego se cargan los pósters desde la web.
    await Promise.all(this.peliculas.map((pelicula) => pelicula.cargarImagen()));
    this.filtrarPeliculas();
  }

  configurarEventos() {
    this.vista.alCambiarGenero(() => this.filtrarPeliculas());

    this.vista.alVerFunciones((titulo) => {
      this.vista.mostrarAviso(`Las funciones de "${titulo}" se agregarán en una siguiente etapa.`);
    });

    this.vista.alHacerClic("btnAcceso", () => {
      this.vista.mostrarAviso("El acceso para estudiantes y docentes se implementará en una siguiente etapa.");
    });

    this.vista.alHacerClic("btnPromociones", () => {
      this.vista.mostrarAviso("Las promociones universitarias se definirán durante el desarrollo del proyecto.");
    });

    this.vista.alHacerClic("btnFunciones", () => this.vista.irACartelera());
  }

  filtrarPeliculas() {
    const genero = this.vista.obtenerGeneroSeleccionado();
    const resultado = genero === "Todas"
      ? this.peliculas
      : this.peliculas.filter((pelicula) => pelicula.genero === genero);
    this.vista.mostrarPeliculas(resultado);
  }
}