import { Board } from '@/app/board/page';

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <>
      <li className="border-gray-950 p-11">
        <p className="font-bold">{board?.title}</p>
      </li>
      <div className="divider"></div>
    </>
  );
};

export default BoardItem;
