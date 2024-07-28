import { useState } from 'react';

interface ApiResponse {
    error?: string;
    doneAddAdminUser?: string;
}

function AssignmentSupervisorIndicatorStore() {
    const [errorAdd, setError] = useState('');
    const [doneAssignmentStore, setdoneAssignmentStore] = useState('');

    const token = localStorage.getItem('token');

    const AssignmentStore = async (
        period_id: number,
        supervisor_id: number,
        employee_ids: number[],
        evaluation_items_id: number,
        Impact_weight: number
    ) => {
        try {
            const headers = new Headers();
            if (token) {
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Authorization', 'Bearer ' + token);
            }

            const response = await fetch(
                'https://mqtt-broker.ir/api/admin/evaluation-assignment/create',
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        period_id,
                        supervisor_id,
                        employee_ids,
                        evaluation_items_id,
                        Impact_weight
                    }),
                },
            );

            const data: ApiResponse = await response.json();

            if (response.ok) {
                setError('');
                setdoneAssignmentStore('عملیات با موفقیت انجام شد.');
            } else {
                setError(data.error || response.statusText);
            }
        } catch (error) {
            setError('خطا در ارتباط با سرور');
            console.error(error);
        }
    };

    return { errorAdd, AssignmentIndiStore, doneAssignmentStore };
}

export default AssignmentSupervisorIndicatorStore;
