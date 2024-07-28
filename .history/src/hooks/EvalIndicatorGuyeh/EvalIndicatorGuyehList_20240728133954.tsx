import { useEffect, useState } from 'react';

interface ApiResponse {
    errorGuyeh: string;
    dataIndicatorGuyeh: object;
}

function EvalIndicatorGuyehList() {
    const [errorGuyeh, setError] = useState('');
    const [dataIndicatorGuyeh, setData] = useState<object | null>(null); // تغییر نوع به object | null
    const token = localStorage.getItem('token');

    const getEvalIndicatorGuyehListData = async (id: number) => {
        try {
            const headers = new Headers();
            if (token) {
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Authorization', 'Bearer ' + token); 
            }

            const response = await fetch(
               ` https://mqtt-broker.ir/api/admin/evaluation-item/show/${id}`, 
                {
                    method: 'GET',
                    headers: headers,
                }
            );

            const dataIndicatorGuyeh: ApiResponse = await response.json();

            if (response.ok) {
                setData(dataIndicatorGuyeh.dataIndicatorGuyeh); // فرض بر این است که داده‌ها در اینجا قرار دارند
                setError('');
            } else {
                setError(response.statusText);
            }
        } catch (error) {
            setError('خطا در ارتباط با سرور');
        }
    };

    return { errorGuyeh, dataIndicatorGuyeh, getEvalIndicatorGuyehListData };
}

export default EvalIndicatorGuyehList;

