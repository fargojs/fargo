import { ExtensionContext, Uri, commands, extensions, window } from 'vscode';

import { SidebarProvider } from './providers/SidebarProvider';

// const SCHEMA = 'zotera';

// const schemaJSON = JSON.stringify({
//   type: 'object',
//   properties: {
//     version: {
//       type: 'string',
//       description: 'A stringy string string',
//       enum: ['test']
//     }
//   }
// });

// function onRequestSchemaURI(resource: string): string | undefined {
//   if (resource.endsWith('.yaml')) {
//     return `${SCHEMA}://schema/porter`;
//   }
//   return undefined;
// }

// function onRequestSchemaContent(schemaUri: string): string | undefined {
//   const parsedUri = Uri.parse(schemaUri);
//   if (parsedUri.scheme !== SCHEMA) {
//     return undefined;
//   }
//   if (!parsedUri.path || !parsedUri.path.startsWith('/')) {
//     return undefined;
//   }

//   return schemaJSON;
// }

export async function activate(context: ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    window.registerWebviewViewProvider('vscode-zotera-view', sidebarProvider)
  );

  context.subscriptions.push(
    commands.registerCommand('zotera-vscode.install', () => {
      window.showInformationMessage('Zotera is installed');
    })
  );



  // Integrate with VSCODE-YAML for YAML Schema Support.
  // const yamlExtension = extensions.getExtension('redhat.vscode-yaml');

  // if (yamlExtension?.isActive) {
  //   yamlExtension.exports.registerContributor(
  //     'zotera',
  //     onRequestSchemaURI,
  //     onRequestSchemaContent
  //   );
  // }
}

export function deactivate() {}
