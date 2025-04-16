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
    return `${this.nome} - ${this.idade} anos - ${this.curso} - Nota: ${
      this.notaFinal
    } - ${this.isAprovado() ? "Aprovado" : "Reprovado"}`;
  }
}
let alunos = [];
let alunoEditando = null;

// Carrega os eventos quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Adiciona event listener ao formulário
  document.getElementById("alunoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarAluno();
  });

  // Adiciona event listener ao botão de cadastro
  document.querySelector("#alunoForm button").addEventListener("click", () => {
    cadastrarAluno();
  });

  // Relatórios
  document
    .getElementById("btnAprovados")
    .addEventListener("click", mostrarAprovados);
  document
    .getElementById("btnMediaNotas")
    .addEventListener("click", mostrarMediaNotas);
  document
    .getElementById("btnMediaIdades")
    .addEventListener("click", mostrarMediaIdades);
  document
    .getElementById("btnOrdemAlfabetica")
    .addEventListener("click", mostrarOrdemAlfabetica);
  document
    .getElementById("btnAlunosPorCurso")
    .addEventListener("click", mostrarAlunosPorCurso);
});

// Funções dos relatórios
const mostrarAprovados = () => {
  if (alunos.length === 0) {
    alert("Não há alunos cadastrados.");
    return;
  }

  const aprovados = alunos.filter((aluno) => aluno.isAprovado());

  if (aprovados.length === 0) {
    alert("Nenhum aluno foi aprovado.");
    return;
  }

  const listaAprovados = aprovados.map((aluno) => aluno.toString()).join("\n");
  alert(`Alunos Aprovados (${aprovados.length}):\n\n${listaAprovados}`);
  console.log("Alunos aprovados:", aprovados);
};

const mostrarMediaNotas = () => {
  if (alunos.length === 0) {
    alert("Não há alunos cadastrados.");
    return;
  }

  const total = alunos.reduce((sum, aluno) => sum + aluno.notaFinal, 0);
  const media = total / alunos.length;

  alert(`Média das notas: ${media.toFixed(2)}`);
  console.log("Média das notas:", media);
};

const mostrarMediaIdades = () => {
  if (alunos.length === 0) {
    alert("Não há alunos cadastrados.");
    return;
  }

  const total = alunos.reduce((sum, aluno) => sum + aluno.idade, 0);
  const media = total / alunos.length;

  alert(`Média das idades: ${media.toFixed(1)} anos`);
  console.log("Média das idades:", media);
};

const mostrarOrdemAlfabetica = () => {
  if (alunos.length === 0) {
    alert("Não há alunos cadastrados.");
    return;
  }

  const ordenados = [...alunos].sort((a, b) =>
    a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
  );

  const listaOrdenada = ordenados.map((aluno) => aluno.nome).join("\n");
  alert(`Alunos em ordem alfabética:\n\n${listaOrdenada}`);
  console.log("Alunos ordenados:", ordenados);
};

const mostrarAlunosPorCurso = () => {
  if (alunos.length === 0) {
    alert("Não há alunos cadastrados.");
    return;
  }

  const cursos = {};

  alunos.forEach((aluno) => {
    cursos[aluno.curso] = (cursos[aluno.curso] || 0) + 1;
  });

  const relatorio = Object.entries(cursos)
    .map(([curso, quantidade]) => `${curso}: ${quantidade} aluno(s)`)
    .join("\n");

  alert(`Quantidade de alunos por curso:\n\n${relatorio}`);
  console.log("Alunos por curso:", cursos);
};

const cadastrarAluno = () => {
  const nome = document.getElementById("nomeAluno").value;
  const idade = parseInt(document.getElementById("idadeAluno").value);
  const curso = document.getElementById("curso").value;
  const notaFinal = parseFloat(document.getElementById("notaFinal").value);

  // Validação dos dados
  if (!nome || !idade || !curso || isNaN(notaFinal)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (notaFinal < 0 || notaFinal > 10) {
    alert("A nota deve estar entre 0 e 10.");
    return;
  }

  const aluno = new Aluno(nome, idade, curso, notaFinal);

  if (alunoEditando === null) {
    alunos.push(aluno);
    console.log("Aluno cadastrado:", aluno.toString());
    alert("Aluno cadastrado com sucesso!");
  } else {
    alunos[alunoEditando] = aluno;
    console.log("Aluno editado:", aluno.toString());
    alert("Aluno editado com sucesso!");
    alunoEditando = null;
    document.querySelector("#alunoForm button").textContent = "Cadastrar";
  }

  renderTable();
  document.getElementById("alunoForm").reset();
};

const renderTable = () => {
  const tbody = document.getElementById("tabelaAlunos");
  tbody.innerHTML = "";

  alunos.forEach((aluno, index) => {
    const row = tbody.insertRow();
    row.className = aluno.isAprovado() ? "aprovado" : "reprovado";

    // Célula de ações
    const cellAcoes = row.insertCell();

    // Botão Editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", () => {
      editarAluno(index);
    });

    // Botão Excluir
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.addEventListener("click", () => {
      excluirAluno(index);
    });

    cellAcoes.appendChild(btnEditar);
    cellAcoes.appendChild(btnExcluir);

    // Demais células
    row.insertCell().textContent = aluno.nome;
    row.insertCell().textContent = aluno.idade;
    row.insertCell().textContent = aluno.curso;
    row.insertCell().textContent = aluno.notaFinal;
    row.insertCell().textContent = aluno.isAprovado()
      ? "Aprovado"
      : "Reprovado";
  });
};

const editarAluno = (index) => {
  const aluno = alunos[index];
  document.getElementById("nomeAluno").value = aluno.nome;
  document.getElementById("idadeAluno").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;

  alunoEditando = index;
  document.querySelector("#alunoForm button").textContent = "Salvar Edição";
  console.log("Editando aluno:", aluno.toString());
};

const excluirAluno = (index) => {
  const alunoExcluido = alunos[index];
  alunos.splice(index, 1);

  if (alunoEditando === index) {
    alunoEditando = null;
    document.getElementById("alunoForm").reset();
    document.querySelector("#alunoForm button").textContent = "Cadastrar";
  }

  renderTable();
  console.log("Aluno excluído:", alunoExcluido.toString());
  alert("Aluno excluído com sucesso!");
};
