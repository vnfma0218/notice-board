'use client';
import useSWR from 'swr';
import { getRecentActivities } from '@/api/activity';
import Link from 'next/link';

const RecentActivities = () => {
  const { data } = useSWR('/activities', () => getRecentActivities());
  return (
    <ul>
      {data &&
        data?.map((activity) => (
          <>
            <li key={activity.id}>
              <div className="flex justify-between items-center">
                <p>{activity.text}</p>
                <span className="text-gray-400 text-sm min-w-[150px]">
                  {activity.createdAt}
                </span>
              </div>
              <Link href={`/board/${activity.post.id}`} prefetch={false}>
                <p className="mt-4 text-lg font-bold cursor-pointer hover:text-blue-400">
                  {activity.post.title}
                </p>
              </Link>
            </li>
            <div className="divider"></div>
          </>
        ))}
    </ul>
  );
};

export default RecentActivities;
