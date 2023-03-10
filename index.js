#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "node:fs";
import { readFile } from "node:fs/promises";
import process from "node:process";

if (fs.existsSync("./src/components")) {
  process.chdir("./src/components");
} else if (fs.existsSync("../src/components")) {
  process.chdir("../src/components");
} else if (fs.existsSync("./src")) {
  process.chdir("./src");
} else if (fs.existsSync("../src")) {
  process.chdir("../src");
} else {
  throw new Error(
    "Not able to locate a path of ./src, ../src, ./src/components or ../src/components and therefore cannot execute add-react-fn-component script. Please ensure one of the above paths in your project exists before retrying the script"
  );
}
const html = JSON.parse(
  await readFile(new URL("./html-lib.json", import.meta.url))
);

function validatePascalCase(str) {
  if (!str[0].match(/[A-Z]/)) {
    throw new Error(
      "The first word of your react component does not have a capitalized first letter and therefore is not PascalCase. Please adjust."
    );
  } else return true;
}

inquirer
  .prompt([
    {
      name: "componentName",
      message: "Enter React Component Name: ",
      validate: validatePascalCase,
    },
    {
      name: "componentHTML",
      type: "input",
      message: "Which HTML element will the component return?: ",
      default: "div",
    },
    {
      name: "cssOption",
      message: "CSS or styled-components?: ",
      choices: ["styled-components", "css", "neither"],
      type: "list",
      suggestOnly: true,
    },
  ])
  .then((answers) => {
    console.log("answers:", answers);
    if (Object.hasOwn(html, answers.componentHTML)) {
      if (answers.componentName.length === 0) {
        console.log(
          "You must specify a component name. Pascal Case is recommended for React components."
        );

        if (answers.componentHTML.length === 0) {
          console.log(
            "You must specify a component Type. Standard HTML ONLY!."
          );
        }
      } else {
        fs.mkdirSync(answers.componentName);
        if (answers.cssOption === "styled-components") {
          fs.writeFileSync(
            `./${answers.componentName}/${answers.componentName}.jsx`,
            `
import styled from 'styled-components';
              
export default function ${answers.componentName}() {
    return (
        <Styled${answers.componentName}>
        </Styled${answers.componentName}>    
    );
}
                      
const Styled${answers.componentName} = styled.${answers.componentHTML}\`\`;
`
          );
          console.log(
            `Component ${answers.componentName} created successfully with styled-component boiler-plate!`
          );
        }

        if (answers.cssOption === "css") {
          let className = "";

          for (let i = 0; i < answers.componentName.length; i++) {
            console.log("answers.componentName[i]:", answers.componentName[i]);
            // is letter a capital?
            if (answers.componentName[i].match(/[A-Z]/)) {
              // if 1st char in str, no hyphen, else hyphen
              i === 0
                ? (className += answers.componentName[i])
                : (className += "-" + answers.componentName[i]);
            } else {
              className += answers.componentName[i];
            }
          }

          const finalClassName = className.toLowerCase();

          fs.writeFileSync(
            `./${answers.componentName}/${answers.componentName}.css`,
            `.${finalClassName} {
display: visible;
/* enter css here */
}
`
          );
          fs.writeFileSync(
            `./${answers.componentName}/${answers.componentName}.jsx`,
            `import '${answers.componentName}.css';
              
export default function ${answers.componentName}() {
    return (
    <${answers.componentName} className="${finalClassName}">
    </${answers.componentName}>    
    );
}
`
          );
          console.log(
            `Component ${answers.componentName} created successfully with css boiler-plate!`
          );
        }
        if (answers.cssOption === "neither") {
          fs.writeFileSync(
            `./${answers.componentName}/${answers.componentName}.jsx`,
            `
export default function ${answers.componentName}() {
    return (
    <${answers.componentName}>
    </${answers.componentName}>    
    );
}
`
          );
        }
      }
    } else
      throw new Error(
        `the html element you entered: ${answers.componentHTML} is NOT VALID. Please check your spelling`
      );
  });
