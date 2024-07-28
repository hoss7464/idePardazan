import { useState } from 'react';

interface ApiResponse {
  errorCreateItem?: string;
}

function EvalItemAdd() {
  const [errorCreateItem, setError] = useState('');
  const token = localStorage.getItem('token');
 
  const addEvalItem = async (
    title: string,
    evaluation_indicators_id : number,
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
        'https://mqtt-broker.ir/api/admin/evaluation-item/create',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ title, evaluation_indicators_id , data }),
        },
      );
  
      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        window.location.href = '/evalItem';
      } else {
        setError(data.errorCreateItem || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(errorCreateItem);
    }
  };

  return { errorCreateItem, addEvalItem };
}

export default EvalItemAdd;
