/* eslint-disable operator-linebreak */
import { writeFile } from 'node:fs/promises';
import { getJsDoc } from 'tsutils';
import * as TS from 'typescript';

const JSDocTagToInclude = 'configuration';

function createZodImport() {
  return TS.factory.createImportDeclaration(
    undefined,
    TS.factory.createImportClause(false, TS.factory.createIdentifier('z'), undefined),

    TS.factory.createStringLiteral('zod'),
    undefined
  );
}

interface SimplifiedJSDocTag {
  tagName: string;
  comment?: string;
}

export function getSimplifiedJsDocTags(jsDocs: TS.JSDoc[]): SimplifiedJSDocTag[] {
  const tags: SimplifiedJSDocTag[] = [];
  jsDocs.forEach((jsDoc) => {
    (jsDoc.tags || []).forEach((tag) => {
      const tagName = tag.tagName.escapedText.toString();
      const comment = typeof tag.comment === 'string' ? tag.comment : undefined;
      tags.push({ tagName, comment });
    });
  });

  return tags;
}

export default function exec(program: TS.Program, printer: TS.Printer) {
  const nodes: Array<TS.InterfaceDeclaration | TS.TypeAliasDeclaration | TS.EnumDeclaration> = [];

  const visit = (node: TS.Node, sourceFile: TS.SourceFile) => {
    if (
      TS.isInterfaceDeclaration(node) ||
      TS.isTypeAliasDeclaration(node) ||
      TS.isEnumDeclaration(node)
    ) {
      const jsDoc = getJsDoc(node, sourceFile);
      const tags = getSimplifiedJsDocTags(jsDoc);
      const tagNames = tags.map((tag) => tag.tagName);

      if (!tagNames.includes(JSDocTagToInclude)) return;
      nodes.push(node);
    }
    TS.forEachChild(node, (child) => visit(child, sourceFile));
  };

  program.getSourceFiles().forEach((sourceFile) => {
    // This could be a problem if we
    // add declaration files to the project.
    if (!sourceFile.isDeclarationFile) {
      visit(sourceFile, sourceFile);
    }
  });
  nodes.forEach((node) => {
    console.log(node.name.text);
  });
}
