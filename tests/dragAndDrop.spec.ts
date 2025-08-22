import { test, expect } from "@playwright/test";
import { FileExplorerPage } from "../pages/FileExplorerPage";
import { getBaseUrl } from "../utils/env";

/*
TEST SCOPE - File Explorer: Drag and Drop
1. Navigate to File Explorer app
2. Select a file by name from source
3. Drag and drop file into target folder
4. Verify file exists in target folder
*/

test.describe("File Explorer - Drag and Drop", () => {
  // Test: Drag and drop a specific file into a specific folder
  test("Drag and drop file between folders @regression", async ({ page }) => {
    const explorer = new FileExplorerPage(page);
    await page.goto(getBaseUrl());

    // Replace with actual file and folder names from your app
    const fileName = "Report1.txt";
    const targetFolder = "TargetFolder";

    await explorer.dragAndDropFile(fileName, targetFolder);

    // Assertion: verify file is now visible
    await explorer.verifyItemExists(fileName);
    await expect(page.locator(`.folder-item:has-text("${targetFolder}")`))
      .toContainText(fileName); // Assert file is listed under target folder
  });
});
