import * as React from 'react'
import { useEffect } from 'react'
import Editor from '../../components/Editor/Editor';
import { Grid, Fab } from '@material-ui/core';
import { view } from '@risingstack/react-easy-state';
import { AppStore } from '../../store/AppStore';

const firebase = require("firebase");
require("firebase/firestore");


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
    selectOnLineNumbers: false,
    formatOnPaste: true,
    minimap: {
        enabled: false
    }
};

const optionsTwo = {
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
db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        log(JSON.stringify(doc.data()))
    });
});
`;

const defaultOutput = `{"message": "Right Click to format (actually only support json)"}`;

function FirestorePage(props: Props) {

    function log(value: any) {
        console.log(value)
        AppStore.codeOutput = value;
    }
    async function run() {
       await eval(AppStore.codeValue);
       console.log('run!');
    }

    useEffect(() => {
        AppStore.codeOutput = defaultOutput;
        AppStore.codeValue = defaultText;
        console.log(AppStore.apiKey)
       if (AppStore.run > 0) {
        run();
       }
    }, [AppStore.run])

    return (
        <Grid container>
            <Grid item xs={6}>
                <Editor height="100vh" width="100%" language="javascript" options={optionsOne}  value={defaultText}/>
            </Grid>
            <Grid item xs={6}>
                <Editor height="100vh" width="100%" language="json" options={optionsTwo} value={AppStore.codeOutput}/>
            </Grid>
        </Grid>
    )
}

export default view(FirestorePage)