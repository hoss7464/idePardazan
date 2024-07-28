import { useState } from 'react';

//Type of data we expect from server :
interface ApiResponse {
  errorCreateIndicator?: string;
}

//Function to add data on server :
function EvalIndicatorAdd() {
  //State for error 
  const [errorCreateIndicator, setError] = useState('');
  //Retrieves a value from browser local storage
  const token = localStorage.getItem('token');
 
  const addEvalIndicator = async (
    //Type of data to send towards the server :
    title: string,
    evaluation_parameters_id: number,
    goal: string,
  ) => {
    try {
      //Creates a new headers object to define HTTP request headers
      const headers = new Headers();
      //If token exists it adds several headers to request 
      if (token) {
        //Indicates that the request body will be in json format 
        headers.append('Content-Type', 'application/json');
        //Indicates that the client accept json format 
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
