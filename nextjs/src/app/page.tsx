"use client";

import React, { useEffect, useState } from 'react';
import Input from './components/Input';
import Feed from './components/Feed';
import ServerLive from './components/ServerLive';
import { fetchAllPosts } from './api/rails-app/api'; 
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (session?.id_token) {
      fetchAllPosts(session.id_token)
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching all posts:', error));
    } else {
      console.log('No session available')
    }
  }, [session, refresh]);

  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
        <ServerLive />
        <h2 className='text-lg sm:text-xl font-bold'>Fulcrum Engineering Hub</h2>
      </div>
      <Input />
      <Feed posts={posts} updatePosts={() => setRefresh(!refresh)} />
    </div>
  );
}
