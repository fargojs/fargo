import type { TextDocument, Uri, Webview, WebviewView, WebviewViewProvider } from "vscode";

import { getNonce, getUri } from "../utils";

export class SidebarProvider implements WebviewViewProvider {
  _view?: WebviewView;
  _doc?: TextDocument;

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(webviewView: WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, this._extensionUri);
  }

  public revive(panel: WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: Webview, extensionUri: Uri) {
    const stylesUri = getUri(webview, extensionUri, ["dist", "webview", "assets", "index.css"]);

    const scriptUri = getUri(webview, extensionUri, ["dist", "webview", "assets", "index.js"]);
    console.log(stylesUri.fsPath);
    console.log(scriptUri.fsPath);

    const nonce = getNonce();
    return /* html */ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <script nonce="${nonce}">
            const vscode = acquireVsCodeApi();
          </script>
        </head>
        <body>
          <h1>Hello from the webview!</h1>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }
}
