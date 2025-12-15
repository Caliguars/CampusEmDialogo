function criarVotacao() {
    let pergunta = document.getElementById("pergunta").value;

    if (pergunta === "") {
        alert("Digite uma pergunta!");
        return;
    }

    document.getElementById("resultado").innerHTML = `
        <div class="mt-3 p-3 bg-secondary rounded">
            <h5>${pergunta}</h5>
            <button class="btn btn-success me-2" onclick="alert('Votou SIM')">Sim</button>
            <button class="btn btn-danger" onclick="alert('Votou NÃO')">Não</button>
        </div>
    `;
}
