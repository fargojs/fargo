import { ExtensionContext, commands, window } from 'vscode';

import { SidebarProvider } from './providers/SidebarProvider';

export function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    window.registerWebviewViewProvider('vscode-zotera-view', sidebarProvider)
  );

  context.subscriptions.push(
    commands.registerCommand('zotera-vscode.install', () => {
      window.showInformationMessage('Zotera is installed');
    })
  );
}

export function deactivate() {}
