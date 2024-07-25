import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function CorporationUpdate() {
  const [errorupdate, setError] = useState('');
  const token = localStorage.getItem('token');

  const updateCompany = async (name:string,id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(`https://mqtt-broker.ir/api/admin/corporation-list/${id}/update`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ name}),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href ="/Member/company"

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); // برای لاگ کردن خطا در کنسول
    }
  };

  return { errorupdate, updateCompany };
}

export default CorporationUpdate;
