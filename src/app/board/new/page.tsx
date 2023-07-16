'use client';
import { savePost } from '@/api/post';
import MessageModal from '@/components/MessageModal';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IPostForm {
  title: string;
  content: string;
}

export default function NewBoard() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const [form, setForm] = useState<IPostForm>({
    title: '',
    content: '',
  });
  const changeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const id = e.target.id;
    const value = e.target.value;
    setForm((prev) => {
      if (id === 'title') {
        return { ...prev, title: value };
      } else {
        return { ...prev, content: value };
      }
    });
  };

  const submitForm = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await savePost(form);
      console.log('data', data);
      if (data.message) {
        setInfoMsg(data.message);
        window.message_modal.showModal();
      }
      if (data.id) {
        router.replace(`/board/${data.id}`);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="mt-20 mb-10">
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-md w-full mt-1"
            onChange={changeInput}
          />
          <label htmlFor="content" className="block mt-10">
            내용
          </label>
          <textarea
            id="content"
            className="textarea textarea-bordered textarea-lg  w-full"
            placeholder="내용을 입력해주세요"
            onChange={changeInput}
          ></textarea>
        </div>
        <div className="flex justify-end mt-10">
          <button
            onClick={() => {
              router.back();
            }}
            className="btn btn-outline border-gray-300 px-7 btn-sm mr-3"
          >
            취소
          </button>

          <button
            className="btn btn-info px-7 btn-sm text-white"
            onClick={submitForm}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              '등록'
            )}
          </button>
        </div>
      </div>
      {/* <ToastMessage message="테스트" alertType={AlertTypes.error} /> */}
      <MessageModal
        title={'안내'}
        message={infoMsg}
        // alertType={AlertTypes.error}
      />
    </main>
  );
}
