import { store } from '@risingstack/react-easy-state';

export const AppStore = store({ 
    codeValue: "",
    codeOutput: "",
    run: 0,
    increment: () => AppStore.run++
 });
