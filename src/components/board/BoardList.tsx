import { Board } from '@/app/board/page';
import BoardItem from './BoardItem';

const BoardList = ({ boardList }: { boardList: Board[] }) => {
  return (
    <ul>
      {boardList.map((board) => {
        return <BoardItem board={board} key={board.id} />;
      })}
    </ul>
  );
};

export default BoardList;
