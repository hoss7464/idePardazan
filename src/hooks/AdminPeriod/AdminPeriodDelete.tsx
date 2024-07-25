import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function AdminPeriodDelete() {
  const [errordelete, setError] = useState('');
  const token = localStorage.getItem('token');

  const deletePeriod = async (id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(`https://mqtt-broker.ir/api/admin/period/${id}/delete`, {
        method: 'DELETE',
        headers: headers,
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = "/period"

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); 
    }
  };

  return { errordelete, deletePeriod };
}

export default AdminPeriodDelete;
