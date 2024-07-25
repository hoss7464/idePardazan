import { useState } from 'react';

interface ApiResponse {
  errorCreateParam?: string;
}

function EvalParamAdd() {
  const [errorCreateParam, setError] = useState('');
  const token = localStorage.getItem('token');

  const addEvalParam = async (title: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/evaluation-parameter/create',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ title }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = '/evalParam';
      } else {
        setError(data.errorCreateParam || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(errorCreateParam);
    }
  };

  return { errorCreateParam, addEvalParam };
}

export default EvalParamAdd;
