// Estados globales con nueva identidad
let catálogo = [];
let vistaSoloPrestados = false;

// 1. Obtención remota de los libros
const inicializarBiblioteca = async () => {
  try {
    const consulta = await fetch("doc.json");
    catálogo = await consulta.json();
    renderizarCatálogo(catálogo);
    calcularReporte();
  } catch (err) {
    console.error("Error al traer el catálogo:", err);
  }
};
inicializarBiblioteca();

// 2. Construcción de las tarjetas en el DOM
function renderizarCatálogo(colección) {
  const panelLibros = document.getElementById("listaLibros");
  let bloquesHtml = "";

  // Cambiamos el .map().join() por un ciclo for clásico con desestructuración
  for (let i = 0; i < colección.length; i++) {
    const { titulo, autor, prestado } = colección[i];
    
    // Definimos etiquetas y clases dinámicas de otra forma
    const etiquetaEstado = prestado ? "Prestado" : "Disponible";
    const claseCss = prestado ? "prestado" : "disponible";
    const textoBoton = prestado ? "Devolver" : "Prestar";

    bloquesHtml += `
      <div class="libro">
        <h3>${titulo}</h3>
        <p>${autor}</p>
        <p class="${claseCss}">${etiquetaEstado}</p>
        <button onclick="conmutarPrestamo(${i})">${textoBoton}</button>
      </div>
    `;
  }
  
  panelLibros.innerHTML = bloquesHtml;
}

// 3. Acción del botón de cada libro (Prestar / Devolver)
function conmutarPrestamo(posicion) {
  // Invertimos el estado booleano directamente
  catálogo[posicion].prestado = !catálogo[posicion].prestado;

  // Evaluamos qué lista mostrar según el filtro actual
  if (vistaSoloPrestados) {
    const filtradosPrestados = catálogo.filter(item => item.prestado === true);
    renderizarCatálogo(filtradosPrestados);
  } else {
    renderizarCatálogo(catálogo);
  }
  
  calcularReporte();
}

// 4. Oyente para el botón alternador de vistas
document.getElementById("btnPrestados").addEventListener("click", evento => {
  vistaSoloPrestados = !vistaSoloPrestados;

  if (vistaSoloPrestados) {
    const soloPrestados = catálogo.filter(item => item.prestado);
    renderizarCatálogo(soloPrestados);
    evento.target.textContent = "Mostrar todos";
  } else {
    renderizarCatálogo(catálogo);
    evento.target.textContent = "Mostrar prestados";
  }
});

// 5. Módulo de métricas e inventario
function calcularReporte() {
  // Cambiamos la lógica interna: contamos los prestados con un bucle simple
  let contadorPrestados = 0;
  
  catálogo.forEach(item => {
    if (item.prestado) contadorPrestados++;
  });

  const contadorDisponibles = catálogo.length - contadorPrestados;

  document.getElementById("estadisticas").innerHTML = `
    <h3>Inventario</h3>
    <p>Libros disponibles: ${contadorDisponibles}</p>
    <p>Libros prestados: ${contadorPrestados}</p>
  `;
}