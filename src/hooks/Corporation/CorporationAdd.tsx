import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function CorporationList() {
  const [errorAdd, setError] = useState('');
  const token = localStorage.getItem('token');

  const addCompany = async (name: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch("https://mqtt-broker.ir/api/admin/corporation-list/create", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name}),

      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = "/Member/company"

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); 
    }
  };

  return { errorAdd, addCompany };
}

export default CorporationList;
