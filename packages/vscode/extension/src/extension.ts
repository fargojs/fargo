import type { ExtensionContext } from "vscode";
import { commands, window } from "vscode";

export async function activate(ctx: ExtensionContext) {
  // ctx.subscriptions.push(
  //   window.registerWebviewViewProvider("vscode-zotera-view", sidebarProvider)
  // );

  ctx.subscriptions.push(
    commands.registerCommand("zotera-vscode.install", () => {
      window.showInformationMessage("Zotera is installed");
    })
  );
}

export function deactivate() {}
