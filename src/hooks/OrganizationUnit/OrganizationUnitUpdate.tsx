import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function OrganizationUnitUpdate() {
  const [errorupdate, setError] = useState('');
  const token = localStorage.getItem('token');

  const updateOU = async (title:string,id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(`https://mqtt-broker.ir/api/admin/organization-unit-list/${id}/update`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title}),
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = "/Member/OrganizationUnit"

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); 
    }
  };

  return { errorupdate, updateOU };
}

export default OrganizationUnitUpdate;
