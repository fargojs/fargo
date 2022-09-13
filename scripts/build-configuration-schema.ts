import * as TS from 'typescript';

import zodSchemaExec from './utils/create-zod-schema';

const command = 'pnpm run build:configuration-schema';

async function run() {
  const program = TS.createProgram({
    rootNames: ['packages/types/src/types.ts'],
    options: {
      target: TS.ScriptTarget.ESNext,
      module: TS.ModuleKind.ESNext,
      lib: ['ESNext'],
      moduleResolution: TS.ModuleResolutionKind.NodeNext,
      esModuleInterop: true,
      jsx: TS.JsxEmit.React,
      strict: true,
      declaration: true,
      noUnusedLocals: true,
      useUnknownInCatchVariables: false,
      resolveJsonModule: true
    }
  });

  const printer = TS.createPrinter({
    newLine: TS.NewLineKind.LineFeed
  });

  zodSchemaExec(program, printer);
}

run();
