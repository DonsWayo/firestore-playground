import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.scss';
import Application from './components/Application';


// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const robotoFont = document.createElement('link');
robotoFont.setAttribute('rel', 'stylesheet');
robotoFont.setAttribute(
    'href',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
);
document.body.appendChild(robotoFont);

const materialIcons = document.createElement('link');
materialIcons.setAttribute('rel', 'stylesheet');
materialIcons.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
document.body.appendChild(materialIcons);



// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
            <AppContainer>
                    <Component />
            </AppContainer>,
        mainElement
    );
};

render(Application);
