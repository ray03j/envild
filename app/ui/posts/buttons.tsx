import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}


export function CreatePost() {
  return (
    <Link
      href="/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">投稿する</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export const EditPost = ({ children, type }: { children: string; type?: "button" | "submit" }) => {
  return (
    <Link
      href="/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
    >
      <button type={type}>{children}</button>
    </Link>
  );
}

export const HomeButton = ({ children }: { children: string }) => {
  return (
    <Link
      href="/"
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      <span>{children}</span>{' '}
    </Link>
  );
}