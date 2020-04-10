import { store } from '@risingstack/react-easy-state';
import * as packageJson from '../../../package.json';

export const AppStore = store({ 
    codeValue: "",
    codeOutput: "",
    run: 0,
    firebaseVersion: packageJson.dependencies.firebase,
    appVersion: packageJson.version,
    showSettingsDialog: false,
    get editorColor() {
        return localStorage.getItem("light") ? "light" : "dark";
    },
    increment: () => AppStore.run++,
    apiKey: localStorage.getItem("apiKey"),
    authDomain: localStorage.getItem("authDomain"),
    projectId: localStorage.getItem("projectId")
 });
