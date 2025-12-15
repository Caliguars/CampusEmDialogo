let votacoes = JSON.parse(localStorage.getItem("votacoes")) || [];
const tipoUsuario = "adm"; // "adm" ou "aluno"

// Criar votação com documento
function criarVotacao() {
    let pergunta = document.getElementById("pergunta").value;
    let arquivo = document.getElementById("documento").files[0];

    if (!pergunta) {
        alert("Digite uma pergunta!");
        return;
    }

    let documentos = [];

    if (arquivo) {
        const url = URL.createObjectURL(arquivo);

        documentos.push({
            nome: arquivo.name,
            url: url
        });
    }

    const novaVotacao = {
        pergunta: pergunta,
        sim: 0,
        nao: 0,
        aberta: true,
        documentos: documentos
    };

    votacoes.push(novaVotacao);
    salvarVotacoes();
    exibirVotacoes(votacoes);

    document.getElementById("pergunta").value = "";
    document.getElementById("documento").value = "";
}

// Votar
function votar(index, tipo) {
    if (!votacoes[index].aberta) {
        alert("Esta votação está encerrada.");
        return;
    }

    if (tipo === "sim") votacoes[index].sim++;
    if (tipo === "nao") votacoes[index].nao++;

    salvarVotacoes();
    exibirVotacoes(votacoes);
}

// Fechar votação
function fecharVotacao(index) {
    votacoes[index].aberta = false;
    salvarVotacoes();
    exibirVotacoes(votacoes);
}

// Excluir votação
function excluirVotacao(index) {
    if (!confirm("Deseja excluir esta votação?")) return;

    votacoes.splice(index, 1);
    salvarVotacoes();
    exibirVotacoes(votacoes);
}

// Salvar
function salvarVotacoes() {
    localStorage.setItem("votacoes", JSON.stringify(votacoes));
}

// Exibir votações
function exibirVotacoes(lista) {
    const div = document.getElementById("resultado");
    div.innerHTML = "";

    lista.forEach((v, index) => {
        let docsHTML = "";

        v.documentos.forEach(doc => {
            docsHTML += `
                <li>
                    <a href="${doc.url}" target="_blank" class="text-white">
                        📄 ${doc.nome}
                    </a>
                </li>
            `;
        });

        div.innerHTML += `
            <div class="mt-3 p-3 bg-secondary rounded">
                <h5>${v.pergunta}</h5>

                ${docsHTML ? `
                    <ul class="mt-2">
                        ${docsHTML}
                    </ul>
                ` : `<p class="text-muted">Nenhum documento anexado</p>`}

                ${v.aberta ? `
                    <button class="btn btn-success me-2"
                            onclick="votar(${index}, 'sim')">Sim</button>
                    <button class="btn btn-danger me-2"
                            onclick="votar(${index}, 'nao')">Não</button>
                ` : `<span class="badge bg-dark">Votação encerrada</span>`}

                ${tipoUsuario === "adm" ? `
                    <div class="mt-2">
                        ${v.aberta ? `
                            <button class="btn btn-warning me-2"
                                    onclick="fecharVotacao(${index})">
                                Fechar
                            </button>
                        ` : ""}
                        <button class="btn btn-outline-danger"
                                onclick="excluirVotacao(${index})">
                            Excluir
                        </button>
                    </div>
                ` : ""}

                <p class="mt-2">
                    👍 ${v.sim} | 👎 ${v.nao}
                </p>
            </div>
        `;
    });
}

// Pesquisa
function pesquisar() {
    const texto = document.getElementById("pesquisa").value.toLowerCase();

    const filtradas = votacoes.filter(v =>
        v.pergunta.toLowerCase().includes(texto)
    );

    exibirVotacoes(filtradas);
}

// Carregar
window.onload = () => {
    exibirVotacoes(votacoes);
};
