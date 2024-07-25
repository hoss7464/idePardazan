import { useState } from 'react';

interface ApiResponse {
  errordelete?: string;
}

function EvalParamDelete() {
  const [errordelete, setError] = useState('');
  const token = localStorage.getItem('token');

  const deleteEvalParam = async (id: string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(`https://mqtt-broker.ir/api/admin/evaluation-parameter/${id}/delete`, {
        method: 'DELETE',
        headers: headers,
      });

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = "/evalParam"

      } else {
        setError(data.errordelete || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error); 
    }
  };

  return { errordelete, deleteEvalParam };
}

export default EvalParamDelete;
