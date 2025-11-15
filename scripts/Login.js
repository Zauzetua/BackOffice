const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class LoginData {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

function Login(loginData) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        });
        const data = yield res.json();
        if (!res.ok) {
            throw new Error(data.message || "El inicio se sesion fallo");
        }
        return data;
    });
}

function saveToken(token) {
    localStorage.setItem("authToken", token);
}

var form = document.getElementById("form-login");

form.addEventListener("submit", (e) => __awaiter(this, void 0, void 0, function* () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    e.preventDefault();
    var loginData = new LoginData(email, password);
    try {
        var result = yield Login(loginData);
        saveToken(result.token);
        window.location.href = "Home.html";
    }
    catch (err) {
        console.log(err);
    }
}));