import { useState } from 'react';

interface ApiResponse {
  errorUpdateIndicator?: string;
}

function EvalIndicatorUpdate() {
  const [errorUpdateIndicator, setError] = useState('');
  const token = localStorage.getItem('token');

  const updateEvalIndicator = async (
    title: string,
    id: string,
    evaluation_parameters_id: number,
    goal: string,
  ) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-indicator/${id}/update`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ title, evaluation_parameters_id, goal }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = '/evalIndicator';
      } else {
        setError(data.errorUpdateIndicator || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error);
    }
  };

  return { errorUpdateIndicator, updateEvalIndicator };
}

export default EvalIndicatorUpdate;
