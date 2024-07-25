import { useState } from 'react';

interface ApiResponse {
  errorParam: string;
  dataParam: object;
}

function EvalParamList() {
  const [errorParam, setError] = useState('');
  const [dataParam, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getEvalParamListData = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/evaluation-parameter/',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const dataParam: ApiResponse = await response.json();

      if (response.ok) {
        setData(dataParam.data); 
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorParam,dataParam, getEvalParamListData };
}

export default EvalParamList;
