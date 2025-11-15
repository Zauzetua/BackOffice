function ObtenerToken() {
    return localStorage.getItem("authToken");
}
const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";

function LogOut() {
    localStorage.removeItem("authToken");
    window.location.href = "Login.html";
}

function LimpiarModal() {
    document.getElementById("titulo-proyecto").value = "";
    document.getElementById("descripcion-proyecto").value = "";
    document.getElementById("tecnologias-proyecto").value = "";
    document.getElementById("repo-proyecto").value = "";
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

//Para agregar
//Para hacer el modal visible
document.getElementById("agregar-proyecto-btn").addEventListener("click", () => {
    document.getElementById("modal-proyecto").style.display = "flex";
})

// Cerrar modal
document.getElementById("cerrar-modal-btn").addEventListener("click", () => {
    document.getElementById("modal-proyecto").style.display = "none";
});

// Guardar proyecto
document.getElementById("guardar-proyecto-btn").addEventListener("click", () => {
    const editingProjectId = document.getElementById("proyecto-id").value;
    const title = document.getElementById("titulo-proyecto").value;
    const description = document.getElementById("descripcion-proyecto").value;
    const technologies = document.getElementById("tecnologias-proyecto").value.split(",");
    const repository = document.getElementById("repo-proyecto").value;

    var payload = {
        title: title,
        description: description,
        technologies: technologies.map(tech => tech.trim()),
        repository: repository
    };

    if (!title.trim() || !description.trim()) {
        alert("Titulo y descripcion son obligatorios");
        return;
    }

    if (editingProjectId) {
        console.log("Editando proyecto con ID:", editingProjectId);
        //PUT
    } else {
        console.log("Creando nuevo proyecto");
        //POST
    }

    //Falta hacer el POST a la API
    LimpiarModal(); 
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
        var descripcion = divContenedor.querySelector(".descripcion").innerText;
        var tecnologias = divContenedor.querySelector(".tecnologias").innerText.replace("Tecnologías:", "").trim();
        var repo = divContenedor.querySelector(".repo-link").href;

        //Modal cargado
        document.getElementById("titulo-proyecto").value = titulo;
        document.getElementById("proyecto-id").value = proyectoId;
        document.getElementById("descripcion-proyecto").value = descripcion;
        document.getElementById("tecnologias-proyecto").value = tecnologias;
        document.getElementById("repo-proyecto").value = repo;

        document.getElementById("modal-proyecto").style.display = "flex";
    }
});

//Eliminar
document.getElementById("proyectos-lista").addEventListener("click", function (e) {

    if (e.target.classList.contains("btn-eliminar")) {
        const divContenedor = e.target.closest(".proyecto-item");
        var proyectoId = divContenedor.querySelector(".proyecto-id").value;
        //Aqui va el codigo para hacer el DELETE a la API
        divContenedor.remove();
    }
});




