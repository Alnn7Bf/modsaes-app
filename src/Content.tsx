import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import type { Subject } from "./types/Subject";
import App from "./App";
import "./index.css";

const panel = "my-panel";
const PANEL_ID = "copy";

let rootElement = document.getElementById(panel) as HTMLTableRowElement | null;

if (!rootElement) {
  const tbody = document.querySelector(
    `#${PANEL_ID} .container table tbody`
  );

  if (!tbody) {
    console.error("No se encontró el tbody objetivo.");
  } else {
    rootElement = document.createElement("tr");
    rootElement.id = panel;

    if (tbody.children.length >= 1) {
      tbody.insertBefore(rootElement, tbody.children[1]);
    } else {
      tbody.appendChild(rootElement);
    }
  }
}

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

(() => {
  const table = document.getElementById("ctl00_mainCopy_dbgHorarios");

  if (!table) return;

  const tableRow = table.parentElement?.parentElement?.parentElement?.parentElement;

  tableRow?.classList.add('hidden!');

  const tbody = table.querySelector("tbody");

  if (!tbody) return;

  const rows = [...tbody.querySelectorAll("tr")];

  // ===== FILTROS ACTUALES =====

  const career = (document.getElementById("ctl00_mainCopy_Filtro_cboCarrera") as HTMLSelectElement | null)?.value || "";
  const shift = (document.getElementById("ctl00_mainCopy_Filtro_cboTurno") as HTMLSelectElement | null)?.value || "";
  const plan = (document.getElementById("ctl00_mainCopy_Filtro_cboPlanEstud") as HTMLSelectElement | null)?.value || "";
  const semester = (document.getElementById("ctl00_mainCopy_Filtro_lsNoPeriodos") as HTMLSelectElement | null)?.value || "";

  const currentFilter = `${career}-${shift}-${plan}-${semester}`;

  // ===== GUARDAR CONTEXTO ACTUAL DEL SAES =====

  const currentPage = {
    career,
    shift,
    plan,
    semester,

    filter:currentFilter,

    updatedAt: new Date().toISOString()
  };

  localStorage.setItem("saesCurrentPage", JSON.stringify(currentPage));

  // ===== EXTRAER TABLA =====

  const subjects : Subject[] = rows.slice(1).map((row) => {
    const cells = row.children;
    
    const group = cells[0]?.textContent.trim() || "";
    const subject = cells[1]?.textContent.trim() || "";
    const teacher = cells[2]?.textContent.trim() || "";
    const building = cells[3]?.textContent.trim() || "";
    const classroom = cells[4]?.textContent.trim() || "";
    const monday = cells[5]?.textContent.trim() || "";
    const tuesday = cells[6]?.textContent.trim() || "";
    const wednesday = cells[7]?.textContent.trim() || "";
    const thursday = cells[8]?.textContent.trim() || "";
    const friday = cells[9]?.textContent.trim() || "";
    const saturday = cells[10]?.textContent.trim() || "";

    const id = `${currentFilter}-${group}-${teacher}-${subject}`;

    return {
      id,

      career,
      shift,
      plan,
      semester,

      group,
      subject,
      teacher,
      building,
      classroom,

      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,

      loadedAt:
        new Date().toISOString()
    };
  });

  // ===== GUARDAR EN LOCAL STORAGE =====

  const existing = JSON.parse(localStorage.getItem("saesSubjects") || "[]");

  // eliminar solo datos del mismo filtro
  const filtered = existing.filter((item : Subject) => {
    const itemFilter = `${item.career}-${item.shift}-${item.plan}-${item.semester}`;

    return itemFilter !== currentFilter;
  });

  // combinar
  const updatedStorage = [
    ...filtered,
    ...subjects
  ];

  localStorage.setItem(
    "saesSubjects",
    JSON.stringify(updatedStorage)
  );

  console.log(
    "Materias guardadas:",
    subjects.length
  );
})();