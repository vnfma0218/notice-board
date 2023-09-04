'use client';
import useSWR from 'swr';
import { getRecentActivities } from '@/api/activity';
import { useEffect } from 'react';
import Link from 'next/link';

const RecentActivities = () => {
  const { data } = useSWR('/activities', () => getRecentActivities());
  return (
    <ul>
      {data &&
        data?.map((el) => (
          <li>
            <div className="flex justify-between items-center">
              <p>{el.text}</p>
              <span className="text-gray-400 text-sm">{el.createdAt}</span>
            </div>
            <Link href={`/board/${el.post.id}`} prefetch={false}>
              <p className="mt-4 text-lg font-bold cursor-pointer hover:text-blue-400">
                {el.post.title}
              </p>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default RecentActivities;
