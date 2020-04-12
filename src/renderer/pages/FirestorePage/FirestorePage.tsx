import * as React from 'react'
import { useEffect } from 'react'
import Editor from '../../components/Editor/Editor';
import { Grid, Fab, LinearProgress } from '@material-ui/core';
import { view } from '@risingstack/react-easy-state';
import { AppStore } from '../../store/AppStore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

let db;

if (!AppStore.apiKey) {
    console.log('is null')
    AppStore.showSettingsDialog = true
} else {
    if (firebase.apps.length === 0) {
        firebase.initializeApp({
            apiKey: AppStore.apiKey,
            authDomain: AppStore.authDomain,
            projectId: AppStore.projectId
        });
    }
    db = firebase.firestore();
}

interface Props {

}

const optionsOne = {
    automaticLayout: true,
    selectOnLineNumbers: false,
    formatOnPaste: true,
    minimap: {
        enabled: false
    }
};

const optionsTwo = {
    automaticLayout: true,
    selectOnLineNumbers: false,
    formatOnPaste: true,
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
    readOnly: false,
    formatOnType: true,
    minimap: {
        enabled: false
    }
};

const defaultText = `//use log() to get the response in the second panel
let result = [];
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        result.push(doc.data())
    });
    log(result);
});

`;

const defaultOutput = ``;

function FirestorePage(props: Props) {

    function log(value: any) {
        console.log(value)
        AppStore.codeOutput = JSON.stringify(value);
    }

    function logArray(value: any) {
        console.log(value)
        AppStore.codeOutput = JSON.stringify(value);
    }

    async function run() {
       AppStore.isLoadingOutput = true;
       console.log(AppStore.codeValue)
       await eval(AppStore.codeValue);
       console.log("finish");
       AppStore.isLoadingOutput = false;
    }

    useEffect(() => {    
       if (AppStore.run > 0) {
        run();
       } else {
        AppStore.codeValue = defaultText;
       }
    }, [AppStore.run])

    return (
        <Grid container>
             <Grid item xs={12}>
                { AppStore.isLoadingOutput ? <LinearProgress/> : <></>}
            </Grid>
            <Grid item xs={6}>
                <Editor height="100vh" width="100%" language="javascript" options={optionsOne}  value={defaultText} editorType="code"/>
            </Grid>
            <Grid item xs={6}>
                <Editor height="100vh" width="100%" language="json" options={optionsTwo} value={AppStore.codeOutput} editorType="output"/>
            </Grid>
        </Grid>
    )
}

export default view(FirestorePage)