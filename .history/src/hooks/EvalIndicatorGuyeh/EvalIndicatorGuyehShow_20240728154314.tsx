import { useState } from 'react';

interface ApiResponse {
    errorShow: string;
  userData: object;
}

function AdminUserShowInfo() {
  const [errorShow, setError] = useState('');
  const [userData, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getData = async (id:string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/user/${id}`,
        {
          method: 'GET',
          headers: headers,
        },
      );

      const userData: ApiResponse = await response.json();

      if (response.ok) {
        setData(userData.data); 
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorShow,userData, getData };
}

export default AdminUserShowInfo;
