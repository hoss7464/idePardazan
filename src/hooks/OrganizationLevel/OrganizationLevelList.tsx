import { useState } from 'react';

interface ApiResponse {
  errorOL: string;
  dataOL: object;
}

function OrganizationLevelList() {
  const [errorOL, setError] = useState('');
  const [dataOL, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getOrganizationLevelList = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/organization-level-list/',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const dataOL: ApiResponse = await response.json();
      setData(dataOL.data); 

      if (response.ok) {
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorOL,dataOL, getOrganizationLevelList };
}

export default OrganizationLevelList;
