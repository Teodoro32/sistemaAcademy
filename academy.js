class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    toString() {
        return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario}`;
    }
}

let funcionarios = [];

function cadastrarFuncionario() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;
    
    if (nome && idade && cargo && salario) {
        const funcionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(funcionario);
        atualizarTabela();
    }
}

function atualizarTabela() {
    const tabela = document.getElementById("tabelaFuncionarios");
    tabela.innerHTML = "";
    funcionarios.forEach(funcionario => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = funcionario.nome;
        row.insertCell(1).textContent = funcionario.idade;
        row.insertCell(2).textContent = funcionario.cargo;
        row.insertCell(3).textContent = funcionario.salario;
    });
}




















/*
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `${this.nome} - ${this.idade} anos - ${this.curso} - Nota: ${this.notaFinal}`;
    }
}

let alunos = [];

document.getElementById("alunoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let curso = document.getElementById("curso").value;
    let notaFinal = document.getElementById("notaFinal").value;
    
    let aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);
    renderTable();
    this.reset();
});

function renderTable() {
    let tbody = document.getElementById("alunosTableBody");
    tbody.innerHTML = "";
    alunos.forEach((aluno, index) => {
        let row = tbody.insertRow();
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        `;
    });
}

function excluirAluno(index) {
    alunos.splice(index, 1);
    renderTable();
}

function editarAluno(index) {
    let aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("notaFinal").value = aluno.notaFinal;
    excluirAluno(index);
}

*/
