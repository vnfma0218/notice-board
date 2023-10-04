'use client';
import useSWR from 'swr';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getPostList } from '@/api/post';
import PostList from '@/components/board/PostList';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MessageModal from '@/components/MessageModal';
import { showModal } from '@/redux/features/modal/modalSlice';
import { SearchTypes } from '@/lib/types';

interface IPageInfo {
  page: number;
  limit: number;
  type: SearchTypes;
}

export default function BoardPage() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const queryPage = searchParams.get('page');
  const querySort = searchParams.get('sort');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      params.delete('sort');
      params.set(name, value);
      console.log('params', params.toString());
      return params.toString();
    },
    [searchParams]
  );

  const [searchParam, setSearchParam] = useState<IPageInfo | null>({
    page: 1,
    limit: 5,
    type: SearchTypes.asc,
  });

  const { data, isLoading } = useSWR(
    searchParam ? ['/posts', searchParam] : null,
    () => getPostList(searchParam!)
  );

  useEffect(() => {
    if (queryPage || querySort) {
      console.log('querySort', querySort);
      setSearchParam(null);
      setSearchParam((prev) => ({
        ...prev!,
        page: queryPage ? Number(queryPage) : 1,
        type: querySort ? (querySort as SearchTypes) : SearchTypes.asc,
      }));
    }
  }, [queryPage, querySort]);

  const onPageChange = (page: number) => {
    if (page + 1 > 1) {
      router.push(
        pathname +
          '?' +
          createQueryString('sort', searchParam?.type ?? '') +
          '&' +
          createQueryString('page', (page + 1).toString())
      );
    } else {
      router.push(
        pathname +
          '?' +
          createQueryString('sort', searchParam?.type ?? '') +
          '&' +
          createQueryString('page', '1')
      );
    }
    setSearchParam((prev) => ({ ...prev!, page: page + 1 }));
  };

  const onSearchOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParam((prev) => ({
      ...prev!,
      type: e.target.value as SearchTypes,
    }));

    router.push(
      pathname +
        '?' +
        createQueryString('sort', e.target.value) +
        '&' +
        createQueryString('page', '1')
    );
  };

  const clickWritePostBtn = () => {
    if (isLoggedIn) {
      router.push('/board/new');
    } else {
      dispatch(
        showModal({
          message: '로그인이 필요합니다 로그인 하시겠습니까?',
          title: '안내',
          hasConfirm: true,
          confirmCallback: () => {
            router.push('/login');
          },
        })
      );

      window.message_modal.show();
    }
  };

  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="flex justify-between items-center mt-20 mb-10">
        <button
          onClick={clickWritePostBtn}
          className="btn btn-info px-7 btn-md text-white"
        >
          작성하기
        </button>
        <select
          value={searchParam?.type}
          onChange={onSearchOptionChange}
          className="select select-bordered select-sm max-w-xs"
        >
          <option value="asc">최신순</option>
          <option value="desc">등록순</option>
          <option value="likeCount">좋아요순</option>
        </select>
      </div>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, idx) => {
            return (
              <div key={idx} className="mb-4">
                <div className="flex items-center">
                  <div
                    data-placeholder
                    className="mb-2 h-14 w-14 rounded-full overflow-hidden relative bg-gray-200"
                  ></div>
                  <div
                    data-placeholder
                    className="mb-2 ml-2 h-6 w-12  overflow-hidden relative bg-gray-200"
                  ></div>
                </div>

                <div
                  data-placeholder
                  className="mb-2 h-14 w-full overflow-hidden relative bg-gray-200"
                ></div>
              </div>
            );
          })}
        </>
      ) : null}
      {/* TODO 스켈레톤 ui */}
      {data?.results.length ? <PostList posts={data.results} /> : null}
      {data?.results.length ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(page) => {
            onPageChange(page.selected);
          }}
          forcePage={searchParam!.page - 1}
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
      <MessageModal />
    </main>
  );
}
