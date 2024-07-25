import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function CorporationDelete() {
  const [errordelete, setError] = useState('');
  const token = localStorage.getItem('token');

  const deleteCompany = async (id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(`https://mqtt-broker.ir/api/admin/corporation-list/${id}/delete`, {
        method: 'DELETE',
        headers: headers,
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
      console.error(error); // برای لاگ کردن خطا در کنسول
    }
  };

  return { errordelete, deleteCompany };
}

export default CorporationDelete;
