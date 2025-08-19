'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { grantAccess } from '../../../../../../contract_connections/CourseRegistry/grantAccess';

export default function Access() {
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const params = useParams();
  const course_id = params.id as string;

  const handleGrantAccess = async () => {
    if (!userAddress) {
      setMessage('Please enter a user address.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const result = await grantAccess({ course_id, user: userAddress });
      if (result.success) {
        setMessage('Access granted successfully!');
        setUserAddress('');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Grant Course Access</h1>
      <div className="flex flex-col gap-2">
        <Label htmlFor="userAddress">User Address</Label>
        <Input
          id="userAddress"
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <Button onClick={handleGrantAccess} disabled={loading}>
        {loading ? 'Granting...' : 'Grant Access'}
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
}