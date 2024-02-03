'use client'

import Link from "next/link";

export default function Form() {
  return (
    <div>
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
    </div>
  );
}
