import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

export interface ApiTestCase {
  "TC ID": string;
  Module: string;
  Scenario: string;
  API: string;
  Method: string;
  Endpoint: string;
  Priority: string;
  "Expected Result": string;
}

export function loadApiTestCases(fileName?: string): ApiTestCase[] {
  const actualFileName =
    fileName || "Automation Exercise Test Cases - List of API Test Cases.csv";
  const filePath = path.resolve(__dirname, "..", "data", actualFileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV File not found at path: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Skip the metadata row (BASE URL: ...) if present
  const lines = fileContent.split("\n");
  const csvData = lines[0].includes("BASE URL:")
    ? lines.slice(1).join("\n")
    : fileContent;

  return parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}
