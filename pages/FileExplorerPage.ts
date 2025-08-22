import { Page, Locator } from "@playwright/test";

export class FileExplorerPage {
  // Locator: button to create a new folder
  private readonly createFolderBtn: Locator;

  // Locator: input field to enter folder name
  private readonly folderNameInput: Locator;

  // Locator: generic file item (fallback)
  private readonly sourceFile: Locator;

  // Locator: generic folder item (fallback)
  private readonly targetFolder: Locator;

  // Constructor initializes the Page instance and locators
  constructor(private readonly page: Page) {
    this.createFolderBtn = page.locator("#create-folder");
    this.folderNameInput = page.locator("#folder-name");
    this.sourceFile = page.locator(".file-item");
    this.targetFolder = page.locator(".folder-item");
  }

  // Action: Create a folder with a given name
  async createFolder(folderName: string) {
    await this.createFolderBtn.click();
    await this.folderNameInput.fill(folderName);
    await this.page.keyboard.press("Enter");
  }

  // Action: Drag and drop a specific file into a specific folder
  // Throws a clear error if target folder is not found/visible
  async dragAndDropFile(fileName: string, targetFolderName: string) {
    const source = this.page.locator(`.file-item:has-text("${fileName}")`);
    const target = this.page.locator(`.folder-item:has-text("${targetFolderName}")`);

    await source.waitFor({ state: "visible" });

    try {
      await target.waitFor({ state: "visible", timeout: 5000 });
    } catch {
      throw new Error(`Target folder "${targetFolderName}" was not found or not visible.`);
    }

    await source.dragTo(target);
  }

  // Action: Verify folder/file existence by name
  async verifyItemExists(name: string) {
    await this.page.locator(`text=${name}`).waitFor({ state: "visible" });
  }
}
