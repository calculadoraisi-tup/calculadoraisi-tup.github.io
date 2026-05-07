
const isiSubjects = [
  { id: "analisis-matematico-i", nombre: "Análisis Matemático I" },
  { id: "algebra-y-geometria-analitica", nombre: "Álgebra y Geometría Analítica" },
  { id: "fisica-i", nombre: "Física I" },
  { id: "ingles-i", nombre: "Inglés I" },
  { id: "logica-y-estructuras-discretas", nombre: "Lógica y Estructuras Discretas" },
  { id: "algoritmos-y-estructuras-de-datos", nombre: "Algoritmos y Estructuras de Datos" },
  { id: "arquitectura-de-computadoras", nombre: "Arquitectura de Computadoras" },
  { id: "sistemas-y-procesos-de-negocio", nombre: "Sistemas y Procesos de Negocio" },
  { id: "analisis-matematico-ii", nombre: "Análisis Matemático II" },
  { id: "fisica-ii", nombre: "Física II" },
  { id: "ingenieria-y-sociedad", nombre: "Ingeniería y Sociedad" },
  { id: "ingles-ii", nombre: "Inglés II" },
  { id: "sintaxis-y-semantica-de-los-lenguajes", nombre: "Sintaxis y Semántica de los Lenguajes" },
  { id: "paradigmas-de-programacion", nombre: "Paradigmas de Programación" },
  { id: "sistemas-operativos", nombre: "Sistemas Operativos" },
  { id: "analisis-de-sistemas-de-informacion-(integradora)", nombre: "Análisis de Sistemas de Información (integradora)" },
  { id: "probabilidad-y-estadistica", nombre: "Probabilidad y Estadística" },
  { id: "economia", nombre: "Economía" },
  { id: "bases-de-datos", nombre: "Bases de Datos" },
  { id: "desarrollo-de-software", nombre: "Desarrollo de Software" },
  { id: "comunicacion-de-datos", nombre: "Comunicación de Datos" },
  { id: "analisis-numerico", nombre: "Análisis Numérico" },
  { id: "diseno-de-sistemas-de-informacion-(integradora)", nombre: "Diseño de Sistemas de Información (integradora)" },
  { id: "legislacion", nombre: "Legislación" },
  { id: "ingenieria-y-calidad-de-software", nombre: "Ingeniería y Calidad de Software" },
  { id: "redes-de-datos", nombre: "Redes de Datos" },
  { id: "investigacion-operativa", nombre: "Investigación Operativa" },
  { id: "simulacion", nombre: "Simulación" },
  { id: "tecnologias-para-la-automatizacion", nombre: "Tecnologías para la automatización" },
  { id: "administracion-de-sistemas-de-informacion-(integradora)", nombre: "Administración de Sistemas de Información (integradora)" },
  { id: "inteligencia-artificial", nombre: "Inteligencia Artificial" },
  { id: "ciencia-de-datos", nombre: "Ciencia de Datos" },
  { id: "sistemas-de-gestion", nombre: "Sistemas de Gestión" },
  { id: "gestion-gerencial", nombre: "Gestión Gerencial" },
  { id: "seguridad-en-los-sistemas-de-informacion", nombre: "Seguridad en los Sistemas de Información" },
  { id: "proyecto-final-(integradora)", nombre: "Proyecto Final (integradora)" },
  { id: "practica-profesional-supervisada", nombre: "Práctica Profesional Supervisada" }
];

const equivalencias = [
  { otorga: "Programación I", requeridas: ["Algoritmos y Estructuras de Datos"] },
  { otorga: "Arquitectura y Sistemas Operativos", requeridas: ["Arquitectura de Computadoras", "Sistemas Operativos"] },
  { otorga: "Matemática", requeridas: ["Álgebra y Geometría Analítica", "Lógica y Estructuras Discretas"] },
  { otorga: "Organización Empresarial", requeridas: ["Sistemas y Procesos de Negocio"] },
  { otorga: "Programación II", requeridas: ["Algoritmos y Estructuras de Datos", "Sintaxis y Semántica de los Lenguajes", "Paradigmas de Programación"] },
  { otorga: "Probabilidad y Estadística", requeridas: ["Probabilidad y Estadística"] },
  { otorga: "Base de Datos I", requeridas: ["Bases de Datos"] },
  { otorga: "Inglés I", requeridas: ["Inglés I", "Inglés II"] },
  { otorga: "Programación III", requeridas: ["Desarrollo de Software"] },
  { otorga: "Base de Datos II", requeridas: null },
  { otorga: "Metodología de Sistemas I", requeridas: ["Algoritmos y Estructuras de Datos", "Sistemas y Procesos de Negocio", "Bases de Datos", "Desarrollo de Software"] },
  { otorga: "Inglés II", requeridas: null },
  { otorga: "Programación IV", requeridas: ["Desarrollo de Software"] },
  { otorga: "Metodología de Sistemas II", requeridas: ["Algoritmos y Estructuras de Datos", "Sistemas y Procesos de Negocio", "Bases de Datos", "Desarrollo de Software", "Ingeniería y Calidad de Software"] },
  { otorga: "Introducción al Análisis de Datos", requeridas: ["Ciencia de Datos", "Inteligencia Artificial"] },
  { otorga: "Legislación", requeridas: ["Legislación"] },
  { otorga: "Gestión de Desarrollo de Software", requeridas: ["Ingeniería y Calidad de Software"] }
];

const tupSubjects = equivalencias.map(eq => ({
  id: "tup-" + eq.otorga.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-'),
  nombre: eq.otorga
}));

let currentMode = "ISI_TO_TUP"; // Opciones: "ISI_TO_TUP", "TUP_TO_ISI"

const isiList = document.getElementById("isi-list");
const tupResults = document.getElementById("tup-results");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-selection");
const swapButton = document.getElementById("swap-button");
const panelSourceTitle = document.getElementById("panel-source-title");
const panelTargetTitle = document.getElementById("panel-target-title");
const infoBoxIsi = document.getElementById("info-box-isi");
const infoBoxTup = document.getElementById("info-box-tup");

const idToNameISI = new Map(isiSubjects.map(s => [s.id, s.nombre]));
const idToNameTUP = new Map(tupSubjects.map(s => [s.id, s.nombre]));

function init() {
  renderSourceList();
  
  searchInput.addEventListener("input", () => filterSubjectList(searchInput.value));
  clearButton.addEventListener("click", clearSelection);
  swapButton.addEventListener("click", toggleMode);

  renderSourceList();
}

function renderSourceList() {
  isiList.innerHTML = "";
  const subjects = currentMode === "ISI_TO_TUP" ? isiSubjects : tupSubjects;
  
  subjects.forEach(materia => {
    const div = document.createElement("div");
    div.className = "subject-item";
    div.dataset.id = materia.id;
    div.innerHTML = `
      <input type="checkbox" id="${materia.id}" name="source-subject" value="${materia.id}">
      <label for="${materia.id}">${materia.nombre}</label>
    `;

    div.querySelector("input").addEventListener("change", (e) => {
      if (e.target.checked) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'seleccion_materia',
          'materia_nombre': materia.nombre,
          'modo': currentMode
        });
      }
      calcularEquivalencias();
    });
    isiList.appendChild(div);
  });
  filterSubjectList(searchInput.value);
}

function toggleMode() {
  currentMode = currentMode === "ISI_TO_TUP" ? "TUP_TO_ISI" : "ISI_TO_TUP";
  
  // Actualizar Títulos
  if (currentMode === "ISI_TO_TUP") {
    panelSourceTitle.textContent = "Materias aprobadas en ISI";
    panelTargetTitle.textContent = "Equivalencias en TUP";
    infoBoxIsi.style.display = "block";
    infoBoxTup.style.display = "none";
    searchInput.placeholder = "Buscar materia de ISI...";
  } else {
    panelSourceTitle.textContent = "Materias de TUP";
    panelTargetTitle.textContent = "Requisitos de ISI";
    infoBoxIsi.style.display = "none";
    infoBoxTup.style.display = "block";
    searchInput.placeholder = "Buscar materia de TUP...";
  }

  clearSelection();
  renderSourceList();
}

function calcularEquivalencias() {
  const seleccionadasIds = Array.from(
    document.querySelectorAll("input[name=\"source-subject\"]:checked")
  ).map(cb => cb.value);

  if (seleccionadasIds.length === 0) {
    return renderizarVacio();
  }

  let resultados = [];

  if (currentMode === "ISI_TO_TUP") {
    const seleccionadasNombres = new Set(
      seleccionadasIds.map(id => idToNameISI.get(id)).filter(Boolean)
    );

    resultados = equivalencias
      .filter(eq => Array.isArray(eq.requeridas))
      .filter(eq => eq.requeridas.every(req => seleccionadasNombres.has(req)))
      .map(eq => eq.otorga);
  } else {
    // TUP_TO_ISI: Seleccionamos TUP y vemos qué de ISI se necesita
    const seleccionadasNombres = new Set(
      seleccionadasIds.map(id => idToNameTUP.get(id)).filter(Boolean)
    );

    const requeridasSet = new Set();
    equivalencias
      .filter(eq => seleccionadasNombres.has(eq.otorga) && Array.isArray(eq.requeridas))
      .forEach(eq => {
        eq.requeridas.forEach(req => requeridasSet.add(req));
      });
    
    resultados = Array.from(requeridasSet);
  }

  if (resultados.length === 0) {
    return renderizarVacio();
  }

  renderizarResultados(resultados.sort());
}

function filterSubjectList(query) {
  const normalized = query.trim().toLowerCase();
  const regex =
    normalized === ""
      ? null
      : new RegExp(normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const subjects = currentMode === "ISI_TO_TUP" ? isiSubjects : tupSubjects;

  subjects.forEach(materia => {
    const item = isiList.querySelector(`.subject-item[data-id="${materia.id}"]`);
    if (item) {
      const visible = !regex || regex.test(materia.nombre);
      item.style.display = visible ? "flex" : "none";
    }
  });
}

function clearSelection() {
  document.querySelectorAll("input[name=\"source-subject\"]:checked").forEach(cb => {
    cb.checked = false;
  });
  searchInput.value = "";
  filterSubjectList("");
  renderizarVacio();
}

function renderizarVacio() {
  const msg = currentMode === "ISI_TO_TUP" 
    ? "Selecciona materias de Ingeniería para ver tus equivalencias en la Tecnicatura."
    : "Selecciona materias de la Tecnicatura para ver qué materias de Ingeniería necesitas.";
  tupResults.innerHTML = `<p class="empty-msg">${msg}</p>`;
}

function renderizarResultados(lista) {
  tupResults.innerHTML = "";

  lista.forEach(materia => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.textContent = materia;
    tupResults.appendChild(card);
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  init();
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
