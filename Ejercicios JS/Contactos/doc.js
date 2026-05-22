// Variables globales con otros nombres
let registros = [];
let filtroFavoritosActivo = false;

// 1. Carga inicial de datos
const importarDatos = async () => {
  try {
    const peticion = await fetch("doc.json");
    registros = await peticion.json();
    dibujarInterface(registros);
    actualizarContadores();
  } catch (err) {
    console.error("No se pudieron cargar los datos:", err);
  }
};
importarDatos();

// 2. Renderizado de la lista
function dibujarInterface(arreglo) {
  const cajaContactos = document.getElementById("listaContactos");
  
  // Usamos una acumulación clásica en lugar de .map().join()
  let htmlGenerado = "";
  for (const item of arreglo) {
    let estrella = item.favorito ? '<span class="favorito">*</span>' : '';
    
    htmlGenerado += `
      <div class="contacto">
        <h3>${item.nombre} ${estrella}</h3>
        <p>${item.telefono}</p>
      </div>
    `;
  }
  cajaContactos.innerHTML = htmlGenerado;
}

// 3. Captura del Formulario (Agregar)
document.getElementById("formulario").addEventListener("submit", evento => {
  evento.preventDefault();

  // Guardamos el nuevo registro
  registros.push({
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    favorito: document.getElementById("favorito").checked
  });

  // Limpieza del formulario y reseteo del estado de la vista
  evento.target.reset();
  filtroFavoritosActivo = false;
  document.getElementById("btnFavoritos").textContent = "Mostrar favoritos";

  // Actualizamos pantalla
  dibujarInterface(registros);
  actualizarContadores();
});

// 4. Buscador en tiempo real
document.getElementById("buscar").addEventListener("input", evento => {
  const busqueda = evento.target.value.toLowerCase();
  
  // Filtramos comparando directamente en el método
  const resultados = registros.filter(item => 
    item.nombre.toLowerCase().indexOf(busqueda) !== -1
  );
  
  dibujarInterface(resultados);
});

// 5. Botón Alternador de Favoritos
document.getElementById("btnFavoritos").addEventListener("click", e => {
  filtroFavoritosActivo = !filtroFavoritosActivo;

  if (filtroFavoritosActivo) {
    const destacados = registros.filter(item => item.favorito === true);
    dibujarInterface(destacados);
    e.target.textContent = "Mostrar todos";
  } else {
    dibujarInterface(registros);
    e.target.textContent = "Mostrar favoritos";
  }
});

// 6. Sección de Estadísticas
function actualizarContadores() {
  let creados = registros.length;
  let marcados = registros.filter(item => item.favorito).length;

  document.getElementById("estadisticas").innerHTML = `
    <p>Contactos: ${creados}</p>
    <p>Favoritos: ${marcados}</p>
  `;
}