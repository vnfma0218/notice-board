'use client';

import { useState } from 'react';

const Activities = () => {
  const [activeTab, setActiveTab] = useState<'1' | '2'>('1');

  return (
    <div>
      <div className="mt-5 md:m-0 tabs border-b">
        <a
          onClick={() => setActiveTab('1')}
          className={`tab tab-bordered ${
            activeTab === '1' ? 'tab-active' : null
          }`}
        >
          게시글
        </a>
        <a
          onClick={() => setActiveTab('2')}
          className={`tab tab-bordered ${
            activeTab === '2' ? 'tab-active' : null
          }`}
        >
          댓글
        </a>
      </div>
    </div>
  );
};
export default Activities;
