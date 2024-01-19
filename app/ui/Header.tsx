import Link from 'next/link';

const Header = () => {
  return (
    <div className='flex'>
        <div className='m-2 text-4xl'>Envild</div>
        <ul className='flex'>
          <li className='m-2'>
              <a>Home</a>
          </li>
          <li className='m-2'>
              <a>About</a>
          </li>
          <li className='m-2'>
              <a>Contact</a>
          </li>
        </ul>
    </div>
  );
};

export default Header;