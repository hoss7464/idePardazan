import { useState } from 'react';

interface ApiResponse {
  error: string;
  data: object;
}

function useAdminApi() {
  const [error, setError] = useState('');
  const [data, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const create = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch('https://mqtt-broker.ir/api/admin/me', {
        method: 'GET',
        headers: headers,
      });

      const data: ApiResponse = await response.json();
      setData(data.data);

      if (response.ok) {
        setError('');
      }
      if (response.status === 401) {
        window.location.href = '/login';
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { data, error, create };
}

export default useAdminApi;
