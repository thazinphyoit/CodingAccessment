import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import prettier from "prettier";

// Define a type for the code files
type CodeFiles = Record<string, { code: string }>;

async function processCodeFiles(codeFiles: CodeFiles): Promise<CodeFiles> {
  const lintPromises: Promise<void>[] = [];

  // Traversing each file in the codeFiles object
  for (const filePath in codeFiles) {
    const file = codeFiles[filePath];

    // Only process files that are likely to contain TSX based on the extension
    if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx") || filePath.endsWith(".js")) {
      const ast = parse(file.code, {
        sourceType: "module",
        plugins: ["jsx"],
      });

      traverse(ast, {
        enter(path: NodePath) {
          if (path.node.type === "TemplateLiteral") {
            const leadingComments = path.node.leadingComments;
            if (leadingComments && leadingComments.some(comment => comment.value.trim() === "tsx")) {
              // Lint this template literal and replace the code
              const rawCode = file.code.slice(path.node.start || 0, path.node.end || 0);
              lintPromises.push(lint(rawCode).then(formattedCode => {
                file.code = file.code.substring(0, path.node.start || 0) + formattedCode + file.code.substring(path.node.end || 0);
              }));
            }
          }
        },
      });
    }
  }

  // Wait for all linting promises to complete
  await Promise.all(lintPromises);

  return codeFiles;
}

// This function remains the same as provided in the question
async function lint(code: string): Promise<string> {
  return new Promise<string>(resolve => {
    setTimeout(() => {
      const formattedCode = prettier.format(code, { parser: "babel" });
      resolve(formattedCode);
    }, Math.random() * 1000); // random delay between 0 and 1 second
  });
}

// input data
const DEFAULT_REACT_FILES: CodeFiles = {
    "/App.tsx": {
        code: `import React from "react";

            export default function App() {
            return (
                <div>
                <h1>Hello, World!</h1>
                </div>
            );
        }`
    },
    "/Component.jsx": {
        code: `import React from "react";

            export function MyComponent() {
            return (
                <div>
                <p>This is a sample component.</p>
                </div>
            );
        }`
    },
    "/index.js": {
        code: `console.log("Hello from index.js!");`
    }
  // Add more code files as needed...
};

processCodeFiles(DEFAULT_REACT_FILES).then(lintedFiles => {
  console.log(lintedFiles);
});
