describe("Form Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // ### ELEMENTS INTO VARIABLES ### //
  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const tosInput = () => cy.get('input[name="agreeToTerms"]');
  const submitBtn = () => cy.get("#submit-button");
  const disabledBtn = () => cy.get("button[disabled]");
  // ### ELEMENTS INTO VARIABLES ### //

  it("Get name input and type into, checking if the inputted text contains the name provided", () => {
    nameInput().should("exist");
    nameInput().type("Shariq The Handsome");
    nameInput().should("have.value", "Shariq The Handsome");
  });

  it("Get email input and type into it", () => {
    emailInput().should("exist");
    emailInput().type("overlord@overlord.com");
    emailInput().should("have.value", "overlord@overlord.com");
  });

  it("Get password input and type into it", () => {
    passwordInput().should("exist");
    passwordInput().type("password");
    passwordInput().should("have.value", "password");
  });

  it("User can check terms of service box", () => {
    tosInput().should("exist");
    tosInput().should("not.be.checked");
    tosInput().click();
    tosInput().should("be.checked");
  });

  it("User can submit form data & Form validation works if user input is left empty", () => {
    nameInput().should("have.value", "");
    emailInput().should("have.value", "");
    passwordInput().should("have.value", "");
    tosInput().should("not.be.checked");
    submitBtn().should("exist");

    disabledBtn().should("exist");

    nameInput().type("Shariq The Handsome");
    emailInput().type("overlord@overlord.com");

    disabledBtn().should("exist");

    passwordInput().type("password");

    disabledBtn().should("not.exist");

    submitBtn().click();
    cy.get('div[id="Shariq The Handsome"]').should("exist");
  });
});
