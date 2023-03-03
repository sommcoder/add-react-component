# Add React Components Quickly

A simple cli tool that allows developers to create React boiler-plate code and substantially increase development speed.

Since [React 17](https://stackoverflow.com/questions/71725865/do-i-need-to-import-react-in-every-file) you no longer need to import react to each of your components and so this is not included with this module.

# Install

npm i add-react-fn-component --save-dev

# Run

npm run add

# Follow The Prompts:

1. Enter React Component Name (must be PascalCase)
2. Which HTML element will the component return?
3. CSS or styled-components?:
4. Where are you adding this component?:

# Example:

# styled components:

import styled from 'styled-components';

export default function {ComponentName}() {
return (
<Styled{ComponentName}>
</Styled{ComponentName}>  
 );
}

# external css:
