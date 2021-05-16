import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const NotFound: NextPage = () => {
  return (
    <div>
      <h1>Not Found Page</h1>
      <Link href="/">トップへ</Link>
    </div>
  );
};

export default NotFound;
