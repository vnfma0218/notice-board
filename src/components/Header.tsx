import Avatar from './Avatar';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-10 py-5 max-w-5xl m-auto">
      <p>title</p>
      <nav>
        <ul className="flex items-center">
          <li className="mr-5 cursor-pointer hover:text-blue-400">메뉴1</li>
          <li className="mr-5 cursor-pointer hover:text-blue-400">메뉴2</li>
          {/* <li className="mr-5 cursor-pointer hover:text-blue-400">
            마이페이지
          </li> */}
          <Avatar />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
