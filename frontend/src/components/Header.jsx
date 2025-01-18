import { FaInfoCircle } from 'react-icons/fa';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 shadow-lg">
      <h1 className="text-3xl font-bold text-white">GOAT Debate</h1>
      <FaInfoCircle className="text-gray-400 text-3xl cursor-pointer hover:text-white" title="About" />
    </header>
  );
}

export default Header;
