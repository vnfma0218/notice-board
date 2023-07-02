'use client';
import useSWR from 'swr';

import Link from 'next/link';
import { useState } from 'react';
import { getPostList } from '@/api/post';
import PostList from '@/components/board/PostList';
import ReactPaginate from 'react-paginate';

export default function BoardPage() {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useSWR(['/posts', searchParams], () =>
    getPostList(searchParams)
  );

  const onPageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page: page + 1 }));
  };

  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="mt-20 mb-10">
        {/* TODO 로그인 여부에 따라 Rendering 하기 */}
        <button className="btn btn-info px-7 btn-sm text-white">
          <Link href="/board/new">작성하기</Link>
        </button>
      </div>
      {isLoading ? (
        <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2"></span>
      ) : null}
      {data?.results.length ? <PostList posts={data.results} /> : null}
      {data?.results.length ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(page) => {
            onPageChange(page.selected);
          }}
          pageRangeDisplayed={5}
          pageCount={data.pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination__link'}
          nextLinkClassName={'pagination__link'}
          disabledClassName={'pagination__link--disabled'}
          activeClassName={'pagination__link--active'}
        />
      ) : null}
    </main>
  );
}
