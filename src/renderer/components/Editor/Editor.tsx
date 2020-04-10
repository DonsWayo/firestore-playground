import * as React from 'react'
import MonacoEditor from 'react-monaco-editor';
import { AppStore } from '../../store/AppStore';

interface Props {
    height: string;
    width: string;
    language: string;
    options: any;
    value?: string;
}



export default function Editor(props: Props) {
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
        theme="vs-light"
        options={props.options}
        onChange={(e) => onChange(e)}
      />
    )
}
