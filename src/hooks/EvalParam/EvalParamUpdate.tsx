import { useState } from 'react';

interface ApiResponse {
  errorUpdateParam?: string;
}

function EvalParamUpdate() {
  const [errorUpdateParam, setError] = useState('');
  const token = localStorage.getItem('token');

  const updateEvalParam = async (title: string, id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-parameter/${id}/update`,
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
        setError(data.errorUpdateParam || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error);
    }
  };

  return { errorUpdateParam, updateEvalParam };
}

export default EvalParamUpdate;
