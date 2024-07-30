import { useState } from 'react';

interface ApiResponse {
  error?: string;
}

function OrganizationUnitAdd() {
  const [errorAdd, setError] = useState('');
  const token = localStorage.getItem('token');

  const addOU = async (title: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch("https://mqtt-broker.ir/api/admin/organization-unit-list/create", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ title}),

      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href ="/OrganizationUnit"

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); 
    }
  };

  return { errorAdd, addOU };
}

export default OrganizationUnitAdd;
