# 🎓 Calculadora de Equivalencias ISI a TUP - UTN FRRe

Este proyecto es una herramienta web interactiva diseñada para estudiantes de la carrera de **Ingeniería en Sistemas de Información (ISI)** de la **UTN Facultad Regional Resistencia**. Permite conocer qué materias se reconocen automáticamente al cursar la **Tecnicatura Universitaria en Programación (TUP)**.

## 🚀 Características

* **Interfaz Institucional:** Diseño adaptado con la identidad visual de la UTN FRRe.
* **Buscador en Tiempo Real:** Filtro dinámico para encontrar materias de Ingeniería rápidamente.
* **Cálculo de Lógica Compleja:** Maneja equivalencias que requieren la aprobación de múltiples materias (ej. Arquitectura + Sistemas Operativos).
* **Acceso a Trámites:** Incluye enlaces directos a formularios oficiales de cambio de carrera y solicitud de equivalencias.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura de la aplicación.
* **CSS3:** Diseño responsivo y variables personalizadas.
* **JavaScript (Vanilla):** Motor de cálculo y manipulación del DOM sin librerías externas.

## 📂 Estructura del Proyecto

```bash
├── main.html     # Estructura principal de la aplicación
├── estilos.css   # Estilos visuales y diseño responsivo
├── logica.js     # Base de datos de materias y motor de equivalencias
└── README.md     # Documentación del proyecto 
```
⚙️ Cómo funciona la lógica
El sistema evalúa las materias marcadas por el usuario contra un conjunto de reglas predefinidas en logica.js.

Ejemplo de regla:
Para obtener la equivalencia de Programación II, el sistema verifica que el estudiante tenga aprobadas: Algoritmos y Estructuras de Datos, Sintaxis y Semántica de los Lenguajes y Paradigmas de Programación.

📋 Información Importante
Esta calculadora se basa en el Plan de Estudios 2024 y la ordenanza vigente de la UTN FRRe. Los resultados son de carácter orientativo. El trámite formal debe realizarse ante la Secretaría Académica utilizando los formularios oficiales.

✉️ Contacto
Coordinación TUP: tup@frre.utn.edu.ar

Dirección: French 414, Resistencia, Chaco

Web: frre.utn.edu.ar

Desarrollado para la comunidad de la UTN-FRRe.
