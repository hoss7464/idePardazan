import { useState } from 'react';

interface ApiResponse {
    errorShow: string;
    ItemData: object;
}

function EvalIndicatorGuyehShow() {
  const [errorShow, setError] = useState('');
  const [ItemData, setData] = useState<object[]>([]);
  const token = localStorage.getItem('token');

  const getItemData = async (id:string) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/user/${id}`,
        {
          method: 'GET',
          headers: headers,
        },
      );

      const ItemData: ApiResponse = await response.json();

      if (response.ok) {
        setData(ItemData.data); 
        setError('');
      } else {
        setError(response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
    }
  };

  return { errorShow,ItemData, getItemData };
}

export default EvalIndicatorGuyehShow;
