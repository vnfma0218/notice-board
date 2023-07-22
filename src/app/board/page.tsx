'use client';
import useSWR from 'swr';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getPostList } from '@/api/post';
import PostList from '@/components/board/PostList';
import ReactPaginate from 'react-paginate';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import MessageModal from '@/components/MessageModal';
import { showModal } from '@/redux/features/modal/modalSlice';

interface IPageInfo {
  page: number;
  limit: number;
}

export default function BoardPage() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
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
  const [searchParam, setSearchParam] = useState<IPageInfo | null>({
    page: 1,
    limit: 5,
  });
  const { data, isLoading } = useSWR(
    searchParam ? ['/posts', searchParam] : null,
    () => getPostList(searchParam!)
  );

  useEffect(() => {
    if (search) {
      setSearchParam(null);
      setSearchParam((prev) => ({
        ...prev!,
        page: search ? Number(search) : 1,
      }));
    }
  }, [search]);

  const onPageChange = (page: number) => {
    if (page + 1 > 1) {
      router.push(
        pathname + '?' + createQueryString('page', (page + 1).toString())
      );
    } else {
      router.push(pathname + '?' + createQueryString('page', '1'));
    }
    setSearchParam((prev) => ({ ...prev!, page: page + 1 }));
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
      <div className="mt-20 mb-10">
        {/* TODO 로그인 여부에 따라 Rendering 하기 */}
        <button
          onClick={clickWritePostBtn}
          className="btn btn-info px-7 btn-sm text-white"
        >
          작성하기
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
