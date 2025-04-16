// class Funcionario {
//     constructor(nome, idade, cargo, salario) {
//         this.nome = nome;
//         this.idade = idade;
//         this.cargo = cargo;
//         this.salario = salario;
//     }

//     toString() {
//         return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$ ${this.salario}`;
//     }
// }

// let funcionarios = [];
// let funcionarioEditando = null;

// function cadastrarFuncionario() {
//     const nome = document.getElementById("nome").value;
//     const idade = document.getElementById("idade").value;
//     const cargo = document.getElementById("cargo").value;
//     const salario = document.getElementById("salario").value;

//     if (nome && idade && cargo && salario) {
//         if (funcionarioEditando === null){
//             const funcionario = new Funcionario(nome, idade, cargo, salario);
//             funcionarios.push(funcionario);
//             fetch('/funcionarios', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(funcionarios)
//             }).then(response => {
//                 if (response.ok) {
//                     alert("Funcionário cadastrado com sucesso!");
//                 }
//             }).catch(error => {
//                 console.error('Erro ao salvar funcionário:', error);
//             });
//         } else{
//             funcionarios[funcionarioEditando] = new Funcionario(nome, idade, cargo, salario);
//             funcionarioEditando = null;
//             fetch('/funcionarios', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(funcionarios)
//             }).then(response => {
//                 if (response.ok) {
//                     alert("Funcionário editado com sucesso!");
//                 }
//             }).catch(error => {
//                 console.error('Erro ao atualizar funcionário:', error);
//             });
//         }
//         atualizarTabela();
//         limparFormulario();
//     }
// }

// function atualizarTabela() {
//     const tabela = document.getElementById("tabelaFuncionarios");
//     tabela.innerHTML = "";
//     funcionarios.forEach((funcionario, index) => {
//         const row = tabela.insertRow();

//         const cellAcoes = row.insertCell();
//         const btnEditar = document.createElement("button");
//         btnEditar.textContent = "Editar";
//         btnEditar.onclick = () => editarFuncionario(index);
//         const btnExcluir = document.createElement("button");
//         btnExcluir.textContent = "Excluir";
//         btnExcluir.onclick = () => excluirFuncionario(index);

//         cellAcoes.appendChild(btnEditar);
//         cellAcoes.appendChild(btnExcluir);

//         row.insertCell().textContent = funcionario.nome;
//         row.insertCell().textContent = funcionario.idade;
//         row.insertCell().textContent = funcionario.cargo;
//         row.insertCell().textContent = Number(funcionario.salario).toLocaleString('pt-BR', {
//             style: 'currency',
//             currency: 'BRL'
//         });
//     });
// }

// function editarFuncionario(index) {
//     const funcionario = funcionarios[index];
//     document.getElementById("nome").value = funcionario.nome;
//     document.getElementById("idade").value = funcionario.idade;
//     document.getElementById("cargo").value = funcionario.cargo;
//     document.getElementById("salario").value = funcionario.salario;

//     funcionarioEditando = index;
//     alert("Modo de edição ativado. Faça as alterações e clique em 'Cadastrar'.");
// }

// function excluirFuncionario(index) {
//     funcionarios.splice(index, 1);
//     atualizarTabela();
//     alert("Funcionário excluído com sucesso!");
// }

// function limparFormulario() {
//     document.getElementById("nome").value = "";
//     document.getElementById("idade").value = "";
//     document.getElementById("cargo").value = "";
//     document.getElementById("salario").value = "";
// }

// function relatorioSalarioMaiorQue5000() {
//     const funcionariosFiltrados = funcionarios.filter(funcionario => funcionario.salario > 5000);
//     if (funcionariosFiltrados.length === 0) {
//         alert("Não há funcionários com salário maior que R$ 5000.");
//     } else {
//         alert("Funcionários com salário maior que R$ 5000:\n" + funcionariosFiltrados.map(f => f.toString()).join("\n"));
//     }
// }

// // Relatório da média salarial
// function relatorioMediaSalarial() {
//     const somaSalarios = funcionarios.reduce((total, funcionario) => total + parseFloat(funcionario.salario), 0);
//     const mediaSalarial = somaSalarios / funcionarios.length;
//     alert(`Média Salarial: R$ ${mediaSalarial.toFixed(2)}`);
// }

// // Relatório de cargos únicos (sem repetição)
// function relatorioCargosUnicos() {
//     const cargosUnicos = [...new Set(funcionarios.map(funcionario => funcionario.cargo))];
//     alert("Cargos únicos:\n" + cargosUnicos.join("\n"));
// }

// // Relatório de nomes em maiúsculo
// function relatorioNomesMaiusculos() {
//     const nomesMaiusculos = funcionarios.map(funcionario => funcionario.nome.toUpperCase());
//     alert("Nomes em maiúsculo:\n" + nomesMaiusculos.join("\n"));
// }

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
let funcionarioEditando = null;

function cadastrarFuncionario() {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;
  const cargo = document.getElementById("cargo").value;
  const salario = document.getElementById("salario").value;

  if (nome && idade && cargo && salario) {
    const funcionario = new Funcionario(nome, idade, cargo, salario);

    if (funcionarioEditando === null) {
      funcionarios.push(funcionario);
      alert("Funcionário cadastrado com sucesso!");
    } else {
      funcionarios[funcionarioEditando] = funcionario;
      funcionarioEditando = null;
      alert("Funcionário editado com sucesso!");
    }

    // Atualiza o backend
    fetch("/api/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionarios),
    }).catch((error) => {
      console.error("Erro ao salvar funcionários:", error);
    });

    atualizarTabela();
    limparFormulario();
  }
}

function carregarFuncionarios() {
  fetch("/api/funcionarios")
    .then((response) => response.json())
    .then((data) => {
      funcionarios = data;
      atualizarTabela();
    })
    .catch((error) => console.error("Erro ao carregar funcionários:", error));
}

function atualizarTabela() {
  const tabela = document.getElementById("tabelaFuncionarios");
  tabela.innerHTML = "";

  funcionarios.forEach((funcionario, index) => {
    const row = tabela.insertRow();

    const cellAcoes = row.insertCell();
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarFuncionario(index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirFuncionario(index);

    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);

    row.insertCell().textContent = funcionario.nome;
    row.insertCell().textContent = funcionario.idade;
    row.insertCell().textContent = funcionario.cargo;
    row.insertCell().textContent = Number(funcionario.salario).toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      }
    );
  });
}

function editarFuncionario(index) {
  const funcionario = funcionarios[index];
  document.getElementById("nome").value = funcionario.nome;
  document.getElementById("idade").value = funcionario.idade;
  document.getElementById("cargo").value = funcionario.cargo;
  document.getElementById("salario").value = funcionario.salario;

  funcionarioEditando = index;
  alert("Modo de edição ativado. Faça as alterações e clique em 'Cadastrar'.");
}

function excluirFuncionario(index) {
  funcionarios.splice(index, 1);
  atualizarTabela();

  // Atualiza o backend
  fetch("/api/funcionarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(funcionarios),
  })
    .then(() => {
      alert("Funcionário excluído com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao excluir funcionário:", error);
    });
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("cargo").value = "";
  document.getElementById("salario").value = "";
}

// RELATÓRIOS
function relatorioSalarioMaiorQue5000() {
  const funcionariosFiltrados = funcionarios.filter(
    (f) => parseFloat(f.salario) > 5000
  );
  if (funcionariosFiltrados.length === 0) {
    alert("Não há funcionários com salário maior que R$ 5000.");
  } else {
    alert(
      "Funcionários com salário maior que R$ 5000:\n" +
        funcionariosFiltrados.map((f) => f.toString()).join("\n")
    );
  }
}

function relatorioMediaSalarial() {
  if (funcionarios.length === 0) {
    alert("Nenhum funcionário cadastrado.");
    return;
  }
  const somaSalarios = funcionarios.reduce(
    (total, f) => total + parseFloat(f.salario),
    0
  );
  const mediaSalarial = somaSalarios / funcionarios.length;
  alert(`Média Salarial: R$ ${mediaSalarial.toFixed(2)}`);
}

function relatorioCargosUnicos() {
  const cargosUnicos = [...new Set(funcionarios.map((f) => f.cargo))];
  alert("Cargos únicos:\n" + cargosUnicos.join("\n"));
}

function relatorioNomesMaiusculos() {
  const nomesMaiusculos = funcionarios.map((f) => f.nome.toUpperCase());
  alert("Nomes em maiúsculo:\n" + nomesMaiusculos.join("\n"));
}

// Carrega os funcionários automaticamente ao carregar a página
window.onload = carregarFuncionarios;

// Cadastro de Aluno

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

function cadastrarAluno() {
  const nome = document.getElementById("nomeAluno").value;
  const idade = document.getElementById("idadeAluno").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  if (nome && idade && curso && notaFinal) {
    const aluno = new Aluno(nome, idade, curso, notaFinal);
    alunos.push(aluno);
    renderTable();
    document.getElementById("alunoForm").reset();
  } else {
    alert("Preencha todos os campos.");
  }
}

function renderTable() {
  const tbody = document.getElementById("tabelaAlunos");
  tbody.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const row = tbody.insertRow();

    const cellAcoes = row.insertCell();
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => editarAluno(index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.onclick = () => excluirAluno(index);

    // Adiciona os botões na célula
    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);

    // Células para os dados do aluno
    row.insertCell().textContent = aluno.nome;
    row.insertCell().textContent = aluno.idade;
    row.insertCell().textContent = aluno.curso;
    row.insertCell().textContent = aluno.notaFinal;
  });
}

function excluirAluno(index) {
  alunos.splice(index, 1);
  renderTable();
}

function editarAluno(index) {
  const aluno = alunos[index];
  document.getElementById("nomeAluno").value = aluno.nome;
  document.getElementById("idadeAluno").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;
}
