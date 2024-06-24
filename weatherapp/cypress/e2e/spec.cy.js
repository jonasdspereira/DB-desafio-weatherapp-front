describe("Renderização Inicial do Formulário", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/cadastrar");
  });

  it("Deve exibir todos os elementos do formulário", () => {
    cy.contains("h1", "Cadastro de dados Meteorológicos").should("exist");

    cy.get(".cidadeinput").should("exist");
    cy.get(".temperaturalabel").should("exist");
    cy.get(".datainput").should("exist");
    cy.get(".climaselect").should("exist");
    cy.get(".updown-div").should("have.length", 5);
    cy.get(".buttonscontainer").find("button").should("have.length", 2);
  });

  it("Deve garantir que os campos obrigatórios estão vazios ou com valores padrão", () => {
    cy.get(".cidadeinput").should("have.value", "");
    cy.get(".datainput").should("have.value", "");
    cy.get(".climaselect").should("have.value", "Selecione a opção");
    cy.get(".updown-div").eq(0).find("input").should("have.value", "0");
    cy.get(".updown-div").eq(1).find("input").should("have.value", "0");
    cy.get(".updown-div").eq(2).find("input").should("have.value", "0");
  });
});

describe("Validação de Entrada do Formulário", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Deve exibir mensagem de erro ao enviar formulário com campos obrigatórios vazios", () => {
    cy.get(".salvarbutton").click();

    cy.contains(
      ".Toastify__toast--warning",
      "Por favor, preencha todos os campos.",
      {
        timeout: 4000,
      }
    ).should("exist");

    cy.contains(".error-message", "Informe a cidade.").should("exist");
    cy.contains(".error-message", "Informe a data.").should("exist");
    cy.contains(".error-message", "Selecione um turno.").should("exist");
    cy.contains(".error-message", "Informe a temperatura máxima.").should(
      "exist"
    );
    cy.contains(".error-message", "Informe a temperatura mínima.").should(
      "exist"
    );
    cy.contains(".error-message", "Informe a precipitação.").should("exist");
    cy.contains(".error-message", "Informe a umidade.").should("exist");
    cy.contains(".error-message", "Informe a velocidade do vento.").should(
      "exist"
    );
    cy.contains(".error-message", "Informe o clima.").should("exist");
  });

  it("Deve exibir mensagem de erro ao preencher campos obrigatórios com valores inválidos", () => {
    cy.get(".cidadeinput").type(" ");
    cy.get(".datainput").type("texto inválido");
    cy.get(".climaselect").select("Selecione a opção");

    cy.get(".salvarbutton").click();

    cy.contains(".error-message", "Informe a cidade.").should("exist");
    cy.contains(".error-message", "Informe a data.").should("exist");
    cy.contains(".error-message", "Informe o clima.").should("exist");
  });
});

describe("Interações do Usuário no Formulário", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Deve atualizar corretamente o estado ao preencher campos", () => {
    cy.get(".cidadeinput").type("São Paulo");
    cy.get(".updown-div").eq(0).find("input").type("25");
    cy.get(".updown-div").eq(1).find("input").type("15");
    cy.get(".updown-div").eq(2).find("input").type("10");
    cy.get(".updown-div").eq(3).find("input").type("50");
    cy.get(".updown-div").eq(4).find("input").type("20");

    cy.contains(".turnobutton", "MANHA").click();
    cy.get(".datainput input").type("30-05-2024");
    cy.get(".climaselect").select("LIMPO");

    cy.get(".cidadeinput").should("have.value", "São Paulo");
    cy.get(".datainput input").should("have.value", "30-05-2024");
    cy.get(".climaselect").should("have.value", "LIMPO");
    cy.get(".turnobutton.selected").should("exist");
    cy.get(".updown-div").eq(0).find("input").should("have.value", "25");
    cy.get(".updown-div").eq(1).find("input").should("have.value", "15");
    cy.get(".updown-div").eq(2).find("input").should("have.value", "10");
    cy.get(".updown-div").eq(3).find("input").should("have.value", "50");
    cy.get(".updown-div").eq(4).find("input").should("have.value", "20");
  });

  it("Deve enviar o formulário com sucesso após preencher campos corretamente", () => {
    cy.get(".cidadeinput").type("São Paulo");
    cy.get(".datainput input").type("30-05-2024");
    cy.get(".climaselect").select("LIMPO");

    cy.get(".updown-div").eq(0).find("input").type("25");
    cy.get(".updown-div").eq(1).find("input").type("15");
    cy.get(".updown-div").eq(2).find("input").type("10");
    cy.get(".updown-div").eq(3).find("input").type("50");
    cy.get(".updown-div").eq(4).find("input").type("20");

    cy.contains(".turnobutton", "MANHA").click();

    cy.get(".salvarbutton").click();

    cy.contains(".Toastify__toast--success", "Dados enviados com sucesso!", {
      timeout: 4000,
    }).should("exist");
  });
});
