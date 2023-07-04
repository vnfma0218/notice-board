'use client';
import useSWR from 'swr';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getPostList } from '@/api/post';
import PostList from '@/components/board/PostList';
import ReactPaginate from 'react-paginate';

export default function BoardPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const search = searchParams.get('page');
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const [searchParam, setSearchParam] = useState({
    page: 1,
    limit: 5,
  });
  const { data, isLoading } = useSWR(['/posts', searchParam], () =>
    getPostList(searchParam)
  );

  useEffect(() => {
    setSearchParam((prev) => ({ ...prev, page: search ? Number(search) : 1 }));
  }, [search]);

  const onPageChange = (page: number) => {
    if (page + 1 > 1) {
      router.push(
        pathname + '?' + createQueryString('page', (page + 1).toString())
      );
    } else {
      router.push(pathname + '?' + createQueryString('page', '1'));
    }
    setSearchParam((prev) => ({ ...prev, page: page + 1 }));
  };

  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="mt-20 mb-10">
        {/* TODO 로그인 여부에 따라 Rendering 하기 */}
        <Link href="/board/new">
          <button className="btn btn-info px-7 btn-sm text-white">
            작성하기
          </button>
        </Link>
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
          forcePage={searchParam.page - 1}
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
