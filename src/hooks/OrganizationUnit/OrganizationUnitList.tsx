import { useState } from 'react';

interface ApiResponse {
  errorOU: string;
  dataOU: object;
}

function OrganizationUnitList() {
  const [errorOU, setError] = useState('');
  const [dataOU, setdataOU] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getOrganizationUnitList = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/organization-unit-list/',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const dataOU: ApiResponse = await response.json();
      setdataOU(dataOU.data); 

      if (response.ok) {
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorOU,dataOU, getOrganizationUnitList };
}

export default OrganizationUnitList;
