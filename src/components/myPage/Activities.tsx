'use client';

import { useState } from 'react';
import RecentActivities from './RecentActivities';

const Activities = () => {
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');

  return (
    <div>
      <div className="mt-5 md:m-0 tabs border-b">
        <a
          onClick={() => setActiveTab('1')}
          className={`tab tab-bordered ${
            activeTab === '1' ? 'tab-active' : null
          }`}
        >
          최근 활동
        </a>
        <a
          onClick={() => setActiveTab('2')}
          className={`tab tab-bordered ${
            activeTab === '2' ? 'tab-active' : null
          }`}
        >
          게시글
        </a>
        <a
          onClick={() => setActiveTab('3')}
          className={`tab tab-bordered ${
            activeTab === '3' ? 'tab-active' : null
          }`}
        >
          댓글
        </a>
      </div>
      {/* contents */}
      <div className="p-5">
        {activeTab === '1' ? <RecentActivities /> : null}
        {/* <ul>
          <li>
            <div className="flex justify-between items-center">
              <p>유저님의 게시물을 추천하였습니다.</p>
              <span className="text-gray-400 text-sm">2023-09-04 20:47:39</span>
            </div>
            <p className="mt-4 text-lg font-bold cursor-pointer hover:text-blue-400">
              안녕하세요 글 제목입니다.
            </p>
          </li>
        </ul> */}
      </div>
    </div>
  );
};
export default Activities;
