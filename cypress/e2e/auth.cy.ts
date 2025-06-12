describe("Registration Flow", () => {
  it("should register a new user and redirect to dashboard", () => {
    cy.visit("/register");

    const testEmail = `test_user_${Date.now()}@business.com`;
    const testPassword = "123456aA";

    cy.intercept("POST", "**/register").as("register");

    cy.get('input[type="email"]').type(testEmail);
    cy.get('button[type="submit"]').click();

    cy.wait("@register");

    cy.url().should("include", `/check-email?email=${testEmail}`);

    cy.visit(`/onboarding?email=${testEmail}&token=frontline_test-token`);

    cy.intercept("GET", "https://api.brandfetch.io/v2/search/*").as("brandfetchSearch");

    cy.get('input[name="fullName"]').type("Test User");
    cy.get('input[name="username"]').type(`test_user_${Date.now()}`);
    cy.get('input[name="jobTitle"]').type("Software Engineer");
    cy.get('input[name="companyName"]').type("Mastercard").wait("@brandfetchSearch");
    cy.get("button[data-testid='company-item']").first().click({ force: true });
    cy.get('input[name="password"]').type(testPassword);
    cy.intercept("POST", "**/onboarding*").as("onboarding");

    cy.get('button[type="submit"]').click();

    cy.wait("@onboarding");

    cy.url().should("include", "/login");

    cy.get('input[type="email"]').type(testEmail);
    cy.get('input[type="password"]').type(testPassword);

    cy.intercept("POST", "**/login").as("login");
    cy.get('button[type="submit"]').click();
    cy.wait("@login");

    cy.url().should("include", "/");

    cy.task("removeRegisteredUser", testEmail);
  });
});
