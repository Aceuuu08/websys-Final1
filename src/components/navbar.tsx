import React from 'react';
import Link from 'next/link';

function Header() {
  return (
    <header className='p-4 w-screen'>
      <div className='container mx-auto flex justify-center items-center'>
        <nav className='flex justify-between'>
          <Link href="/" className='mx-4'>
            Home
          </Link>
          <Link href="/profile" className='mx-4'>
            Profile
          </Link>
          <Link href="/posts" className='mx-4'>
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
