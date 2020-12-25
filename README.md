# React Fitty
![React Fitty Example](https://raw.githubusercontent.com/morhogg/react-fitty/main/assets/fitty.gif)

Scales up (or down) text so it fits perfectly to its parent container.

1.5 KB

Ideal for flexible and responsive websites.

# Usage
```javascript
import { ReactFitty } from "react-fitty";

const MyComponent = () => (
    <div>
        <ReactFitty>Text Text Text Text</ReactFitty>
    </div>
)
```
### with Material-UI
```javascript
import { ReactFitty } from "react-fitty";
import { Typography } from "@material-ui/core"

const MyComponent = () => (
    <div>
        <Typography component={ReactFitty}>Text Text Text</Typography>
    </div>
)
```

### with Styled-Components
```javascript
import { ReactFitty } from "react-fitty";
import styled from "styled-components";

const TextStyled = styled(ReactFitty)`
    color: red;
    text-decoration: underline;
`;

const MyComponent = () => (
    <div>
        <TextStyled>Text Text Text</TextStyled>
    </div>
)
```

## Props
| Prop | Type | Optional | Description
| :---: | :---: | :---: | :---: |
| minSize | number | ✓ | Min text size in pixels, default: 16
| maxSize | number | ✓ | Max text size in pixels, max: 512
| wrapText | boolean | ✓ | Wrap lines when using minimum font size., default: false
| observeMutations | Object | ✓ | The object be will merged with the default react-fitty MutationObserver internal config [https://javascript.info/mutation-observer](https://javascript.info/mutation-observer)

## Development Commands

#### Run tests in a real browser
```bash
yarn ci
```

## Acknowledgements
[@rikschennink](https://github.com/rikschennink) for having created [fitty](https://github.com/rikschennink/fitty).
