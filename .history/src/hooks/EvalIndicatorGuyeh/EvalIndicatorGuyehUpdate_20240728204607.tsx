import { useState } from 'react';

interface ApiResponse {
    errorUpdateItem?: string;
}

function EvalIndicatorGuyehUpdate() {
  const [errorUpdateItem, setError] = useState('');
  const token = localStorage.getItem('token');
 
  const updateEvalItem = async (
    id:number,
    title: string,
    evaluation_indicators_id : number,
    data: object,
  ) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }
      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-item/${id}/update`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ title, evaluation_indicators_id , data }),
        },
      );
  
      const dataa: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = `/evalIndicator/evalIndicatorGuyeh/${evaluation_indicators_id}`
      } else {
        setError(dataa.errorUpdateItem || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(errorUpdateItem);
    }
  };

  return { errorUpdateItem, updateEvalItem };
}

export default EvalIndicatorGuyehUpdate;
