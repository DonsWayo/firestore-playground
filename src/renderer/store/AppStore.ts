import { store } from '@risingstack/react-easy-state';

export const AppStore = store({ 
    codeValue: "",
    codeOutput: "",
    run: 0,
    showSettingsDialog: false,
    increment: () => AppStore.run++,
    apiKey: localStorage.getItem("apiKey"),
    authDomain: localStorage.getItem("authDomain"),
    projectId: localStorage.getItem("projectId")
 });
