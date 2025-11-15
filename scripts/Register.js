var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d;
//URL API BASE
const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
/**
 * Clase User
 */
class User {
    constructor(name, email, password, itsonId) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.itsonId = itsonId;
    }
}
/**
 * Funcion para registrar un usuario
 * @param user Usuario a registrar
 * @returns Respuesta gg
 */
function Registrar(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        const data = yield res.json();
        if (!res.ok) { //trono ff
            throw new Error(data.message || "El registro fallo");
        }
        //Salio bien
        return data;
    });
}

var form = document.getElementById("form-register");

//Agregar el evento al formulario
form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
    //Obtener todo lo necesario del DOM.
    var name = (_a = document.getElementById("username")) === null || _a === void 0 ? void 0 : _a.value;
    var email = (_b = document.getElementById("email")) === null || _b === void 0 ? void 0 : _b.value;
    var password = (_c = document.getElementById("password")) === null || _c === void 0 ? void 0 : _c.value;
    var itsonId = (_d = document.getElementById("itson-id")) === null || _d === void 0 ? void 0 : _d.value;
    //Crear el usuario
    var usuario = new User(name, email, password, itsonId);
    console.log(usuario);
    e.preventDefault();
    try {
        var result = yield Registrar(usuario); //Esperar a que se registre
        console.log("Registro exitoso:", result);
        window.location.href = "Login.html";
    }
    catch (err) {
        console.log(err);
    }
}));
