// VISTA
export class PeliculaView {
  constructor() {
    this.contenedor = document.getElementById("contenedorPeliculas");
    this.filtro = document.getElementById("filtroGenero");
    this.toastElemento = document.getElementById("cinachToast");
    this.toastMensaje = document.getElementById("toastMensaje");
    this.manejadorVerFunciones = null;
  }

  //Renderizado

  mostrarPeliculas(peliculas) {
    if (peliculas.length === 0) {
      this.contenedor.innerHTML = `
        <div class="col-12">
          <div class="alert alert-secondary" role="status">No hay películas para el género seleccionado.</div>
        </div>`;
      return;
    }

    this.contenedor.innerHTML = peliculas.map((pelicula) => this.crearTarjeta(pelicula)).join("");

    this.contenedor.querySelectorAll(".btn-funciones").forEach((boton) => {
      boton.addEventListener("click", () => {
        if (this.manejadorVerFunciones) this.manejadorVerFunciones(boton.dataset.titulo);
      });
    });
  }

  crearTarjeta(pelicula) {
    const poster = pelicula.imagen
      ? `<img src="${pelicula.imagen}" alt="Póster de ${pelicula.titulo}" loading="lazy" referrerpolicy="no-referrer">`
      : `<span class="poster-number">${pelicula.numero}</span>
         <div class="poster-title">${pelicula.titulo}</div>`;

    return `
      <div class="col-sm-6 col-lg-4 col-xl-3">
        <article class="movie-card">
          <div class="movie-poster ${pelicula.imagen ? "has-image" : ""}" style="--poster-a: ${pelicula.colorA}; --poster-b: ${pelicula.colorB};">
            ${poster}
          </div>
          <div class="movie-info">
            <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
              <span class="badge genre-badge">${pelicula.genero}</span>
              <span class="movie-meta">${pelicula.clasificacion}</span>
            </div>
            <h3>${pelicula.titulo}</h3>
            <p class="movie-meta mb-2">${pelicula.duracion}</p>
            <p class="muted small">${pelicula.descripcion}</p>
            <button class="btn btn-outline-gold w-100 btn-funciones" data-titulo="${pelicula.titulo}">
              Ver funciones
            </button>
          </div>
        </article>
      </div>`;
  }

  mostrarAviso(mensaje) {
    this.toastMensaje.textContent = mensaje;
    bootstrap.Toast.getOrCreateInstance(this.toastElemento).show();
  }

  irACartelera() {
    document.getElementById("cartelera").scrollIntoView({ behavior: "smooth" });
  }

  obtenerGeneroSeleccionado() {
    return this.filtro.value;
  }

  //Eventos

  alCambiarGenero(manejador) {
    this.filtro.addEventListener("change", manejador);
  }

  alVerFunciones(manejador) {
    this.manejadorVerFunciones = manejador;
  }

  alHacerClic(idElemento, manejador) {
    document.getElementById(idElemento).addEventListener("click", manejador);
  }
}