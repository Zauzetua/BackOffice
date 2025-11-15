//URL API BASE
const API_BASE: string = "https://portfolio-api-three-black.vercel.app/api/v1";

/**
 * Clase User
 */
class User {
    public name: string;
    public email: string;
    public password: string;
    public itsonId: number;

    constructor(name: string, email: string, password: string, itsonId: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.itsonId = itsonId
    }
}

/**
 * Funcion para registrar un usuario
 * @param user Usuario a registrar
 * @returns Respuesta gg
 */
async function Registrar(user: User) {
    const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    const data = await res.json();
    if (!res.ok) {//trono ff
        throw new Error(data.message || "Register failed");
    }
    //Salio bien
    return data;

}

//Obtener todo lo necesario del DOM.
var form = document.getElementById("form-register");
var Nombre = document.getElementById("username")?.innerText;
var Email = document.getElementById("email")?.innerText;
var Password = document.getElementById("itson-id")?.innerText;
var itsonId = document.getElementById("password")?.innerText;



//Crear el usuario
var usuario = new User(Nombre!, Email!, Password!, parseInt(itsonId!));
//Agregar el evento al formulario
form!.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    try {
        var result = await Registrar(usuario); //Esperar a que se registre
        console.log("Registro exitoso:", result);
    } catch (err) {
        console.log(err);
    }
})

