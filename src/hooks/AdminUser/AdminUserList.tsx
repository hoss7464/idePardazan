import { useState } from 'react';

interface ApiResponse {
  error: string;
  data: object;
}

function AdminUserList() {
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

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/user/',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setData(data.data); 
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { error,data, create };
}

export default AdminUserList;
