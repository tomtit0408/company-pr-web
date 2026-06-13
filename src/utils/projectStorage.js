import { projects as defaultProjects } from "../data/companyData";

export function getProjects() {
  const storedProjects = JSON.parse(localStorage.getItem("projects"));

  if (storedProjects && storedProjects.length > 0) {
    return storedProjects;
  }

  localStorage.setItem("projects", JSON.stringify(defaultProjects));
  return defaultProjects;
}

export function saveProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function createSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}