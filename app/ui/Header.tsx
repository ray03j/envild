import Link from 'next/link';
import { CreatePost } from '@/app/ui/posts/buttons';

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-800 text-white'>
      <div className='text-4xl font-bold'>Envild</div>
      <ul className='flex space-x-4'>
        <li>
            <a className='hover:underline'>Home</a>  
        </li>
        <li>
            <CreatePost />
        </li>
      </ul>
    </div>
  );
};

export default Header;
