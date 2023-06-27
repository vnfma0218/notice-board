import { Board } from '@/app/board/page';

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <>
      <li className="flex border-gray-950 p-4">
        <div className="border border-black py-3 px-5 mr-5 text-center rounded-md">
          <p>답변</p>
          <p>2</p>
        </div>
        <div className="pt-1">
          <p className="text-xl font-bold cursor-pointer hover:text-blue-400 mb-3">
            {board?.title}
          </p>
          <p className="text-gray-400 cursor-pointer hover:text-blue-400">
            {board.content}
          </p>
        </div>
      </li>
      <div className="divider m-0"></div>
    </>
  );
};

export default BoardItem;
