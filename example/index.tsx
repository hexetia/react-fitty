import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ReactFitty } from '../src';

const StyledText = styled(ReactFitty)`
    color: red;
    text-decoration: underline;
    font-size: 100%;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const App = () => {
    return (
        <div>
            <ReactFitty id="example">Mussum Ipsum, cacilds</ReactFitty>

            <Typography id="mui" component={ReactFitty} variant="h2">
                Mussum Ipsum, cacilds
            </Typography>

            <StyledText id="styled">Mussum Ipsum, cacilds</StyledText>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
