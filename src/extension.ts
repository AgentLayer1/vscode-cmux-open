import { spawn } from 'node:child_process';
import { dirname } from 'node:path';
import * as vscode from 'vscode';

const COMMAND_ID = 'cmux.openWorkspace';
const SERVICE_NAME = 'New cmux Workspace Here';
const PATH_ENV = '_VSCODE_CMUX_TARGET';

const JXA_SCRIPT = `
ObjC.import('AppKit');

const path = $.NSProcessInfo.processInfo.environment.objectForKey('${PATH_ENV}').js;

const pb = $.NSPasteboard.pasteboardWithUniqueName;
pb.declareTypesOwner($(['NSFilenamesPboardType', 'public.plain-text']), null);
pb.setPropertyListForType($([path]), 'NSFilenamesPboardType');
pb.setStringForType(path, 'public.plain-text');

if (!$.NSPerformService('${SERVICE_NAME}', pb)) {
  throw new Error('NSPerformService failed for: ${SERVICE_NAME}');
}
`;

const resolveDirectory = async (uri: vscode.Uri): Promise<string> => {
  const stat = await vscode.workspace.fs.stat(uri);
  return (stat.type & vscode.FileType.Directory) !== 0 ? uri.fsPath : dirname(uri.fsPath);
};

const openInCmux = (path: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn('osascript', ['-l', 'JavaScript', '-'], {
      stdio: ['pipe', 'ignore', 'pipe'],
      env: { ...process.env, [PATH_ENV]: path },
    });
    let stderr = '';
    child.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(stderr.trim() || `osascript exited with code ${code}`));
    });
    child.stdin?.end(JXA_SCRIPT);
  });

const handleOpenWorkspace = async (uri: vscode.Uri | undefined): Promise<void> => {
  if (process.platform !== 'darwin') {
    vscode.window.showErrorMessage('cmux: this extension only runs on macOS.');
    return;
  }

  if (!uri) {
    vscode.window.showErrorMessage('cmux: no folder selected.');
    return;
  }

  if (uri.scheme !== 'file') {
    vscode.window.showErrorMessage('cmux: only local folders are supported.');
    return;
  }

  try {
    const cwd = await resolveDirectory(uri);
    await openInCmux(cwd);
    vscode.window.setStatusBarMessage(`cmux: opened workspace at ${cwd}`, 3000);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`cmux: failed to open — ${message}`);
  }
};

export const activate = (context: vscode.ExtensionContext): void => {
  context.subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, handleOpenWorkspace));
};

export const deactivate = (): void => {};
