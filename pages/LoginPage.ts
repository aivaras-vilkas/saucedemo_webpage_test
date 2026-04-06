import { Page } from "@playwright/test";

export class LoginPage {
  private usernameInput;
  private passwordInput;
  private loginButton;
  private errorContainer;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorContainer = page.locator('.error-message-container.error');
  }

  async goToHomepage() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForSuccessfulLogin() {
    await this.page.waitForURL('**/inventory.html');
  }

  async successfulLogin() {
    await this.login(
      process.env.STANDARD_USER_EMAIL ?? '',
      process.env.STANDARD_USER_PASSWORD ?? ''
    );
    await this.waitForSuccessfulLogin();
  }

  async getLoginErrorText() {
    await this.errorContainer.waitFor({ state: 'visible' });
    return (await this.errorContainer.textContent())?.trim() ?? '';
  }
}