import * as React from 'react'
import MonacoEditor from 'react-monaco-editor';
import { AppStore } from '../../store/AppStore';
import { useState, useEffect } from 'react';
import { view } from '@risingstack/react-easy-state';

interface Props {
    height: string;
    width: string;
    language: string;
    options: any;
    value?: string;
    editorType: string;
}

let editorRef: any = null;

function Editor(props: Props) {
    const [state, setstate] = useState({
        theme: `vs-${AppStore.editorColor}`
    })

    function onChange(e: any) {
        if(props.editorType === 'code') {
            AppStore.codeValue = e;
        }
    }

    function editorDidMount(editor: any, monaco: any) {
        setTimeout(() => {
          editorRef = editor;
          editor.getAction('editor.action.formatDocument').run();
        }, 100);
    }

    useEffect(() => {
        if (editorRef) {
            editorRef.getAction('editor.action.formatDocument').run();
        }
    }, [props.value])

    return (
        <MonacoEditor
        value={props.value}
        width={props.width}
        height={props.height}
        language={props.language}
        theme={state.theme}
        options={props.options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    )
}

export default view(Editor)
