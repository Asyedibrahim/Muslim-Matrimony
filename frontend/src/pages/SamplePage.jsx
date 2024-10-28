import { Button } from 'flowbite-react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function SamplePage() {

    const location = useLocation();
    const navigate = useNavigate();

    let userInfo = {};
    userInfo = location.state;

  return (
    <div className="p-6 bg-gray-500">
    <div className='flex items-center justify-between'>
        <h1 className="text-2xl font-bold mb-4 text-white">User Information</h1>
        <Button onClick={() => navigate('/', {replace: true})} gradientMonochrome='pink'>Home</Button>
    </div>
      <div className="grid grid-cols-5 gap-4 mt-7">
        {Object.entries(userInfo).map(([key, value]) => (
          <div key={key} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</h2>
            <p className='text-sm'>{value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
