import { useState } from 'react';

interface ApiResponse {
    errorGuyehShow: string;
    selectedItemData: object;
}

function EvalIndicatorGuyehShow() {
  const [errorGuyehShow, setError] = useState('');
  const [selectedItemData, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getselectedItemData = async (id:number) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-item/${id}`,
        {
          method: 'GET',
          headers: headers,
        },
      );

      const selectedItemData: ApiResponse = await response.json();

      if (response.ok) {
        setData(selectedItemData.data.data); 
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorGuyehShow, selectedItemData, getselectedItemData };
}

export default EvalIndicatorGuyehShow;
