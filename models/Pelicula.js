// Administra los datos de la cartelera. Los pósters se obtienen de la web (API de Wikipedia), para no descargar imagenes
export class Pelicula {
  constructor(id, titulo, genero, duracion, clasificacion, descripcion, colorA, colorB, numero, wiki) {
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.duracion = duracion;
    this.clasificacion = clasificacion;
    this.descripcion = descripcion;
    this.colorA = colorA;      // colores de respaldo si la imagen no carga
    this.colorB = colorB;
    this.numero = numero;
    this.wiki = wiki;          // título del artículo en Wikipedia
    this.imagen = null;
  }
  async cargarImagen() {
    const clave = `poster:${this.wiki}`;
    try {
      const guardada = sessionStorage.getItem(clave);
      if (guardada) {
        this.imagen = guardada;
        return;
      }
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(this.wiki)}`;
      const respuesta = await fetch(url);
      if (!respuesta.ok) return;
      const datos = await respuesta.json();
      this.imagen = datos.thumbnail?.source ?? datos.originalimage?.source ?? null;
      if (this.imagen) sessionStorage.setItem(clave, this.imagen);
    } catch (error) {
      // Sin conexión o error de red
    }
  }

  static obtenerTodas() {
    return [
      new Pelicula(1, "Interstellar", "Ciencia ficción", "2 h 49 min", "B", "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.", "#1b4965", "#5fa8d3", "01", "Interstellar (film)"),
      new Pelicula(2, "Blade Runner 2049", "Ciencia ficción", "2 h 44 min", "B15", "Un nuevo blade runner descubre un secreto que podría cambiar el orden de la sociedad.", "#003049", "#d62828", "02", "Blade Runner 2049"),
      new Pelicula(3, "The Dark Knight", "Acción", "2 h 32 min", "B15", "Batman enfrenta al Joker, quien sume a Ciudad Gótica en el caos.", "#212529", "#6c757d", "03", "The Dark Knight (film)"),
      new Pelicula(4, "Mad Max: Furia en el camino", "Acción", "2 h 00 min", "B15", "Una persecución brutal a través del desierto en busca de libertad.", "#bc6c25", "#dda15e", "04", "Mad Max: Fury Road"),
      new Pelicula(5, "Coco", "Animación", "1 h 45 min", "A", "Miguel viaja a la Tierra de los Muertos para descubrir la historia de su familia.", "#9d4edd", "#ff9e00", "05", "Coco (2017 film)"),
      new Pelicula(6, "Spider-Man: Un nuevo universo", "Animación", "1 h 57 min", "A", "Miles Morales se convierte en Spider-Man y conoce a otros héroes del multiverso.", "#5a189a", "#c77dff", "06", "Spider-Man: Into the Spider-Verse"),
      new Pelicula(7, "Parásitos", "Drama", "2 h 12 min", "B15", "Dos familias de mundos opuestos se entrelazan con consecuencias inesperadas.", "#007f5f", "#80b918", "07", "Parasite (2019 film)"),
      new Pelicula(8, "Sueño de fuga", "Drama", "2 h 22 min", "B15", "Un banquero condenado injustamente encuentra esperanza dentro de prisión.", "#264653", "#2a9d8f", "08", "The Shawshank Redemption")
    ];
  }
}