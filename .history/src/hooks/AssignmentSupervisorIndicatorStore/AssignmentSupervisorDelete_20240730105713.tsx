import { useState } from 'react';

interface ApiResponseDelete {
  errorDelete: string;
}

function AssignmentSupervieorDelete() {
  const [errorDelete, setErrorDelete] = useState('');

  const token = localStorage.getItem('token');

  const getAdminSADeletebasedPeriod = async (period_id: number) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-assignment/period/${period_id}/delete`,
        {
          method: 'Delete',
          headers: headers,
        },
      );

      await response.json();

      if (response.ok) {
        setErrorDelete('');
        window.location.href = "/AssignmentIndicator"

      } else {
        setErrorDelete(response.statusText);
      }
    } catch (error) {
      setErrorDelete('خطا در ارتباط با سرور');
    }
  };

  const getAdminSADeletebasedPeriodSupervisor = async (
    supervisor_id: number,
    period_id: number,
  ) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-assignment/supervisor/${supervisor_id}/period/${period_id}/delete`,
        {
          method: 'Delete',
          headers: headers,
        },
      );

      await response.json();

      if (response.ok) {
        setErrorDelete('');
        window.location.href = "/AssignmentIndicator"

      } else {
        setErrorDelete(response.statusText);
      }
    } catch (error) {
      setErrorDelete('خطا در ارتباط با سرور');
    }
  };

  const getAdminSADeletebasedPeriodSupervisorEmployee = async (
    supervisor_id: number,
    period_id: number,
    employee_id: number,
  ) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/evaluation-assignment/employee/${employee_id}/supervisor/${supervisor_id}/period/${period_id}/delete`,
        {
          method: 'Delete',
          headers: headers,
        },
      );

      await response.json();

      if (response.ok) {
        setErrorDelete('');
        window.location.href = "/AssignmentIndicator"

      } else {
        setErrorDelete(response.statusText);
      }
    } catch (error) {
      setErrorDelete('خطا در ارتباط با سرور');
    }
  };

  return {
    errorDelete,
    getAdminSADeletebasedPeriod,
    getAdminSADeletebasedPeriodSupervisor,
    getAdminSADeletebasedPeriodSupervisorEmployee,
  };
}

export default AssignmentSupervieorDelete;
