'use client';
import dynamic from 'next/dynamic';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/tomorrow-night-blue.css';

import { Dispatch, SetStateAction, useMemo, useRef } from 'react';

interface ITextEditor {
  value: string;
  placeholder?: string;
  setContents: Dispatch<SetStateAction<string>>;
  height?: string;
}

const TextEditor = (props: ITextEditor) => {
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import('react-quill'), { ssr: false }),
  //   []
  // );

  const ReactQuill = useMemo(
    () =>
      dynamic(
        () => {
          hljs.configure({
            // optionally configure hljs
            languages: ['javascript', 'php', 'go'],
          });
          // @ts-ignore
          window.hljs = hljs;
          return import('react-quill');
        },
        {
          ssr: false,
          loading: () => <p>Loading</p>,
        }
      ),
    []
  );
  const QuillRef = useRef<any>();

  // Todo 리액트 퀼 이미지 삽입
  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('image', file[0]);

        // 저의 경우 파일 이미지를 서버에 저장했기 때문에
        // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
        try {
          // const res = axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.

          // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
          // url = res.data.url;

          // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드
          // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
            );
          }

          // return { ...res, success: true };
        } catch (error) {
          // const err = error as AxiosError;
          // return { ...err.response, success: false };
        }
      }
    };
  };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      syntax: true,
      // syntax: {
      //   highlight: (text: any) => hljs.highlightAuto(text).value,
      // },
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          [{ 'code-block': 'code-block' }],
          // ['image', 'video'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );
  return (
    <ReactQuill
      // ref={(element) => {
      //   if (element !== null) {
      //     QuillRef.current = element;
      //   }
      // }}
      className="my-editor"
      value={props.value}
      modules={modules}
      theme="snow"
      style={{ height: props.height ? props.height : '90%' }}
      placeholder={props.placeholder ? props.placeholder : ''}
      onChange={props.setContents}
    />
  );
};

export default TextEditor;
