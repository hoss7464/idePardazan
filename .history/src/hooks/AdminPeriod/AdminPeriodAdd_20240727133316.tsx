import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function AdminPeriodAdd() {
  const [errorAdd, setError] = useState('');
  const token = localStorage.getItem('token');

  const addPeriod = async (name: string, start_date: Date, end_date: Date) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/period/create',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ name, start_date, end_date }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = '/period';
      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error);
    }
  };

  return { errorAdd, addPeriod };
}

export default AdminPeriodAdd;


import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

const useAdminPeriodAdd = () => {
  const [errorAdd, setError] = useState<string>('');
  const token = localStorage.getItem('token');

  const createHeaders = (): Headers => {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': Bearer ${token} } : {}),
    });
    return headers;
  };

  const handleApiResponse = async (response: Response): Promise<ApiResponse> => {
    if (!response.ok) {
      const data: ApiResponse = await response.json();
      throw new Error(data.error || response.statusText);
    }
    return await response.json();
  };

  const addPeriod = async (name: string, start_date: Date, end_date: Date) => {
    try {
      const response = await fetch('https://mqtt-broker.ir/api/admin/period/create', {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({ name, start_date, end_date }),
      });

      await handleApiResponse(response);
      setError('');
      window.location.href = '/period';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'خطا در ارتباط با سرور');
      console.error(error);
    }
  };

  return { errorAdd, addPeriod };
};

export default useAdminPeriodAdd;

