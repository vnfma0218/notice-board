'use client';
import BoardList from '@/components/board/BoardList';
import { useEffect, useState } from 'react';

export interface Board {
  id: string;
  title: string;
  content: string;
}

export default function BoardPage() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    setBoards([
      { id: 'aesf', title: '게시판1', content: '내용입니다' },
      { id: 'asef11212', title: '게시판2', content: '내용입니다22' },
      { id: '121212', title: '게시판3', content: '내용입니다33' },
    ]);
  }, []);
  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="mt-20 mb-10">
        <button className="btn btn-info px-7 btn-sm text-white">글작성</button>
      </div>
      {boards.length ? <BoardList boardList={boards} /> : null}
    </main>
  );
}
