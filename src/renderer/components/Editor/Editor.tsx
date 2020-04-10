import * as React from 'react'
import MonacoEditor from 'react-monaco-editor';
import { AppStore } from '../../store/AppStore';
import { useState } from 'react';
import { view } from '@risingstack/react-easy-state';

interface Props {
    height: string;
    width: string;
    language: string;
    options: any;
    value?: string;
}


function Editor(props: Props) {
    const [state, setstate] = useState({
        theme: `vs-${AppStore.editorColor}`
    })
    //@ts-ignore
    function onChange(e) {
        AppStore.codeValue = e;
    }
    return (
        <MonacoEditor
        value={props.value}
        width={props.width}
        height={props.height}
        language={props.language}
        theme={state.theme}
        options={props.options}
        onChange={(e) => onChange(e)}
      />
    )
}

export default view(Editor)
