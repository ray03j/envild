import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='text-4xl font-bold'>Envild</div>
      <ul className='flex space-x-4'>
        <li>
            <a className='hover:underline'>Home</a>  
        </li>
        <li>
            <a className='hover:underline'>About</a>
        </li>
        <li>
            <a className='hover:underline'>Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
