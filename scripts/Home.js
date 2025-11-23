function ObtenerToken() {
    return localStorage.getItem("authToken");
}
const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
var userId = localStorage.getItem("user");

function LogOut() {
    localStorage.removeItem("authToken");
    window.location.href = "Login.html";
}

function LimpiarModal() {
    document.getElementById("titulo-proyecto").value = "";
    document.getElementById("descripcion-proyecto").value = "";
    document.getElementById("tecnologias-proyecto").value = "";
    document.getElementById("repo-proyecto").value = "";
    document.getElementById("imagenes-proyecto").value = "";
}

async function ObtenerProyectos() {
    const token = ObtenerToken();
    try {
        const response = await fetch(`${API_BASE}/projects`, {
            method: "GET",
            headers: {
                "auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error al obtener proyectos");
        }
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return [];
    }
}

async function CrearProyecto(proyecto) {
    const token = ObtenerToken();
    try {
        const response = await fetch(`${API_BASE}/projects`, {
            method: "POST",
            headers: {
                "auth-token": `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)
        });
        if (!response.ok) {
            throw new Error("Error al crear proyecto");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error al crear proyecto:", error);
        return null;
    }
}

async function ActualizarProyecto(proyectoId, proyecto) {
    const token = ObtenerToken();
    try {
        const response = await fetch(`${API_BASE}/projects/${proyectoId}`, {
            method: "PUT",
            headers: {
                "auth-token": `${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(proyecto)
        });
        if (!response.ok) {
            throw new Error("Error al actualizar proyecto");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar proyecto:", error);
        return null;
    }
}

async function EliminarProyecto(proyectoId) {
    const token = ObtenerToken();
    try {
        const response = await fetch(`${API_BASE}/projects/${proyectoId}`, {
            method: "DELETE",
            headers: {
                "auth-token": `${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Error al eliminar proyecto");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al eliminar proyecto:", error);
        return null;
    }
}
//Tokens
const token = localStorage.getItem("authToken");
if (!token) {
    console.log("Token no existe");
    window.location.href = "Login.html";

}
console.log("token existe");

//Clase Proyecto
class Proyecto {
    constructor(_id, title, description, userId, technologies, repository, images) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.technologies = technologies;
        this.repository = repository;
        this.images = images;
    }
}

var proyectos = [];
//Cargar proyectos al iniciar
window.addEventListener("load", async () => {
    proyectos = await ObtenerProyectos();
    const listaProyectosDiv = document.getElementById("proyectos-lista");
    listaProyectosDiv.innerHTML = "";
    proyectos.forEach(proyecto => {
        const proyectoDiv = document.createElement("div");
        proyectoDiv.classList.add("proyecto-item");
        proyectoDiv.innerHTML = `
            <input type="hidden" class="proyecto-id" value="${proyecto._id}">
            <h3>${proyecto.title}</h3>
            <p class="proyecto-descripcion">${proyecto.description}</p>
            <p class="proyecto-tecnologias">Tecnologias: ${proyecto.technologies.join(", ")}</p>
            <a href="${proyecto.repository}" class="repo-link" target="_blank">Repositorio</a>
            <p class="proyecto-imagenes" hidden>Imágenes: ${proyecto.images.join(", ")}</p>
            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
        `;
        listaProyectosDiv.appendChild(proyectoDiv);
    });
});


//Para agregar
//Para hacer el modal visible
document.getElementById("agregar-proyecto-btn").addEventListener("click", () => {
    document.getElementById("modal-proyecto").style.display = "flex";
})

// Cerrar modal
document.getElementById("cerrar-modal-btn").addEventListener("click", (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto
    LimpiarModal();
    document.getElementById("modal-proyecto").style.display = "none";
});

// Guardar proyecto
document.getElementById("guardar-proyecto-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const editingProjectId = document.getElementById("proyecto-id").value;
    const title = document.getElementById("titulo-proyecto").value;
    const description = document.getElementById("descripcion-proyecto").value;
    const technologies = document.getElementById("tecnologias-proyecto").value.split(",");
    const repository = document.getElementById("repo-proyecto").value;
    const imagenesUrls = document.getElementById("imagenes-proyecto").value.split(",").map(url => url.trim()).filter(url => url);

    var payload = {
        title: title,
        description: description,
        technologies: technologies.map(tech => tech.trim()),
        repository: repository,
        images: imagenesUrls
    };

    if (!title.trim() || !description.trim()) {
        alert("Titulo y descripcion son obligatorios");
        return;
    }

    if (editingProjectId) {
        console.log("Editando proyecto con ID:", editingProjectId);
        //PUT
        ActualizarProyecto(editingProjectId, payload).then(updatedProject => {
            if (updatedProject) {
                console.log("Proyecto actualizado:", updatedProject);
                //Actualizar en la lista en el DOM
                const listaProyectosDiv = document.getElementById("proyectos-lista");
                const proyectoDivs = listaProyectosDiv.getElementsByClassName("proyecto-item");
                for (let div of proyectoDivs) {
                    const proyectoIdInput = div.querySelector(".proyecto-id");
                    if (proyectoIdInput.value === editingProjectId) {
                        div.querySelector("h3").innerText = updatedProject.title;
                        div.querySelector(".proyecto-descripcion").innerText = updatedProject.description;
                        div.querySelector(".proyecto-tecnologias").innerText = "Tecnologias: " + updatedProject.technologies.join(", ");
                        div.querySelector(".repo-link").href = updatedProject.repository;
                        break;
                    }
                }
            }
            LimpiarModal();
        });
    } else {
        console.log("Creando nuevo proyecto");
        //POST
        CrearProyecto(payload).then(res => {
            const createdProject = res.data;
            if (createdProject) {
                console.log("Proyecto creado:", createdProject);
                //Agregar a la lista en el DOM
                const listaProyectosDiv = document.getElementById("proyectos-lista");
                const proyectoDiv = document.createElement("div");
                proyectoDiv.classList.add("proyecto-item");
                proyectoDiv.innerHTML = `
                    <input type="hidden" class="proyecto-id" value="${createdProject._id}">
                    <h3>${createdProject.title}</h3>
                    <p class="proyecto-descripcion">${createdProject.description}</p>
                    <p class="proyecto-tecnologias">
                    Tecnologias: ${(createdProject.technologies || []).join(", ")}
                    </p>
                    <a href="${createdProject.repository}" class="repo-link" target="_blank">Repositorio</a>
                    <p class="proyecto-imagenes" hidden>Imágenes: ${(createdProject.images || []).join(", ")}</p>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-eliminar">Eliminar</button>
                `;
                listaProyectosDiv.appendChild(proyectoDiv);
            }
        });
        LimpiarModal();
    }
    document.getElementById("proyecto-id").value = "";
    document.getElementById("modal-proyecto").style.display = "none";
});

//Editar
document.getElementById("proyectos-lista").addEventListener("click", function (e) {

    if (e.target.classList.contains("btn-editar")) {

        const divContenedor = e.target.closest(".proyecto-item");
        editingProjectId = divContenedor.querySelector(".proyecto-id").value;
        var proyectoId = divContenedor.querySelector(".proyecto-id").value;
        var titulo = divContenedor.querySelector("h3").innerText;
        var descripcion = divContenedor.querySelector(".proyecto-descripcion").innerText;
        var tecnologias = divContenedor.querySelector(".proyecto-tecnologias").innerText.replace("Tecnologías:", "").trim();
        var repo = divContenedor.querySelector(".repo-link").href;
        var imagenes = divContenedor.querySelector(".proyecto-imagenes").innerText.replace("Imágenes:", "").trim();
        //Modal cargado
        document.getElementById("titulo-proyecto").value = titulo;
        document.getElementById("proyecto-id").value = proyectoId;
        document.getElementById("descripcion-proyecto").value = descripcion;
        document.getElementById("tecnologias-proyecto").value = tecnologias;
        document.getElementById("repo-proyecto").value = repo;
        document.getElementById("imagenes-proyecto").value = imagenes;

        document.getElementById("modal-proyecto").style.display = "flex";
    }
});

//Eliminar
document.getElementById("proyectos-lista").addEventListener("click", function (e) {

    if (e.target.classList.contains("btn-eliminar")) {
        const divContenedor = e.target.closest(".proyecto-item");
        var proyectoId = divContenedor.querySelector(".proyecto-id").value;
        document.getElementById("modal-confirmacion").style.display = "flex";

        document.getElementById("confirmar-eliminacion-btn").onclick = function () {
            EliminarProyecto(proyectoId).then(response => {
                if (response) {
                    divContenedor.remove();
                }
            });
            document.getElementById("modal-confirmacion").style.display = "none";
        };

        document.getElementById("cancelar-eliminacion-btn").onclick = function () {
            document.getElementById("modal-confirmacion").style.display = "none";
        };
    }
});




