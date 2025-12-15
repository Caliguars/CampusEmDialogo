function fazerLogin() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("senha").value;

    if (user === "admin" && pass === "123") {
        window.location.href = "votacao.html";
    } else {
        alert("Usuário ou senha incorretos!");
    }
}
