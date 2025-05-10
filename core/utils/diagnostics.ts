import fs from 'fs-extra';
import path from 'path';
import { resolveScope } from '../scope/resolveScope.js';

export async function runDiagnostic(scope, projectFolder) {
  const logDir = path.join(projectFolder, 'diagnostics');
  await fs.ensureDir(logDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(logDir, `diag--${timestamp}.txt`);

  const lines = [];
  const summary = {
    success: true,
    issues: [],
    filePath
  };

  const token = process.env.FIGMA_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    lines.push('❌ FIGMA_PERSONAL_ACCESS_TOKEN is missing');
    summary.success = false;
    summary.issues.push('Missing FIGMA_PERSONAL_ACCESS_TOKEN');
  } else {
    lines.push('✅ FIGMA_PERSONAL_ACCESS_TOKEN is present');
  }

  const result = await resolveScope(scope);

  if (!result.valid) {
    lines.push(`❌ Scope resolution failed: ${result.error}`);
    summary.success = false;
    summary.issues.push(result.error);
  } else {
    lines.push(`✅ File: ${result.fileName}`);
    if (scope.pageName) {
      lines.push(result.diagnostics.pageFound
        ? `✅ Page "${scope.pageName}" found`
        : `❌ Page "${scope.pageName}" not found`);
    }
    if (scope.nodeId) {
      if (result.diagnostics.nodeResolved) {
        lines.push(`✅ Node ID resolved → "${result.diagnostics.nodeName}" [${result.diagnostics.nodeType}]`);
      } else {
        lines.push(`❌ Node ID "${scope.nodeId}" could not be resolved.`);
        summary.success = false;
        summary.issues.push(`Could not resolve node ID: ${scope.nodeId}`);
      }
    }
  }

  const content = [
    '🧪 Design Infra Diagnostic Log',
    '==============================',
    '',
    ...lines,
    '',
    'Logged at: ' + new Date().toLocaleString(),
  ].join('\n');

  await fs.writeFile(filePath, content);

  return summary;
}