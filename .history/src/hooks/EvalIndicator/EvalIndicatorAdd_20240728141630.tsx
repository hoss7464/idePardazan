import { useState } from 'react';

//Type of data we expect from server :
interface ApiResponse {
  errorCreateIndicator?: string;
}

//Function to add data on server :
function EvalIndicatorAdd() {
  //State for error 
  const [errorCreateIndicator, setError] = useState('');
  const token = localStorage.getItem('token');
 
  const addEvalIndicator = async (
    title: string,
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
        'https://mqtt-broker.ir/api/admin/evaluation-indicator/create',
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
        setError(data.errorCreateIndicator || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(errorCreateIndicator);
    }
  };

  return { errorCreateIndicator, addEvalIndicator };
}

export default EvalIndicatorAdd;
