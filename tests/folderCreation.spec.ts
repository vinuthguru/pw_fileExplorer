import { test, expect } from "@playwright/test";
import { FileExplorerPage } from "../pages/FileExplorerPage";
import { getBaseUrl } from "../utils/env";
import * as testData from "../testData/folderData.json";

/*
TEST SCOPE - File Explorer: Folder Creation
1. Create 'n' child subfolders under root and verify existence
2. Create a parent folder and add nested subfolders
3. Create recursive nested subfolders
*/

test.describe("File Explorer - Folder Creation", () => {
  
  // Test 1: Create 'n' child subfolders under root
  test("Create n child subfolders @smoke @sanity @regression", async ({ page }) => {
    const explorer = new FileExplorerPage(page);
    await page.goto(getBaseUrl());

    const n = testData.childSubfolders;
    for (let i = 1; i <= n; i++) {
      const folderName = `Folder_${i}`;
      await explorer.createFolder(folderName);
      await explorer.verifyItemExists(folderName);
      await expect(page.locator(`text=${folderName}`)).toBeVisible(); // Assertion
    }
  });

  // Test 2: Create a parent folder and nested subfolders (siblings)
  test("Create desired number of nested subfolders (siblings) @sanity @regression", async ({ page }) => {
    const explorer = new FileExplorerPage(page);
    await page.goto(getBaseUrl());

    const parent = "ParentFolder";
    await explorer.createFolder(parent);
    await explorer.verifyItemExists(parent);
    await expect(page.locator(`text=${parent}`)).toBeVisible(); // Assertion

    for (let i = 1; i <= testData.nestedSubfolders; i++) {
      const child = `${parent}_Child_${i}`;
      await explorer.createFolder(child);
      await explorer.verifyItemExists(child);
      await expect(page.locator(`text=${child}`)).toBeVisible(); // Assertion
    }
  });

  // Test 3: Create recursive nested subfolders (A → B → C → D)
  test("Create recursive nested subfolders @regression", async ({ page }) => {
    const explorer = new FileExplorerPage(page);
    await page.goto(getBaseUrl());

    let currentParent = "ParentFolder";
    await explorer.createFolder(currentParent);
    await explorer.verifyItemExists(currentParent);
    await expect(page.locator(`text=${currentParent}`)).toBeVisible(); // Assertion

    for (let i = 1; i <= testData.recursiveSubfolders; i++) {
      const child = `${currentParent}_Child_${i}`;
      await explorer.createFolder(child);
      await explorer.verifyItemExists(child);
      await expect(page.locator(`text=${child}`)).toBeVisible(); // Assertion
      currentParent = child;
    }
  });
});
