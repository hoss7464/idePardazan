import { useState } from 'react';

interface ApiResponsePeriod {
  errorPeriod: string;
  dataPeriod: object;
}


interface ApiResponseSupervisor {
    errorSupervisor: string;
    dataSupervisor: object;
  }

  
  
interface ApiResponseEmployee {
    errorEmployee: string;
    dataEmployee: object;
  }

  
function AssignmentSupervieorGetData() {
  const [errorPeriod, setErrorPeriod] = useState('');
  const [errorSupervisor, setErrorSupervisor] = useState('');
  const [errorEmployee, setErrorEmployee] = useState('');

  const [dataPeriod, setDataPeriod] = useState<object[]>([]);
  const [dataSupervisor, setDataSupervisor] = useState<object[]>([]);
  const [dataEmployee, setDataEmployee] = useState<object[]>([]);

  const token = localStorage.getItem('token');

  const getAdminPeriodListData = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch('https://mqtt-broker.ir/api/admin/period/', {
        method: 'GET',
        headers: headers,
      });

      const dataPeriod: ApiResponsePeriod= await response.json();

      if (response.ok) {
        setDataPeriod(dataPeriod.data);
        setErrorPeriod('');
      } else {
        setErrorPeriod(response.statusText);
      }
    } catch (error) {
        setErrorPeriod('خطا در ارتباط با سرور');
    }
  };

  const getSupervisorListData = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/user/supervisorlist',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const dataSupervisor: ApiResponseSupervisor = await response.json();

      if (response.ok) {
        setDataSupervisor(dataSupervisor.data);
        setErrorSupervisor('');
      } else {
        setErrorSupervisor(response.statusText);
      }
    } catch (error) {
        setErrorSupervisor('خطا در ارتباط با سرور');
    }
  };

  const getEmployeeListData = async () => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer' + token);
      }

      const response = await fetch(
        'https://mqtt-broker.ir/api/admin/user/employeelist',
        {
          method: 'GET',
          headers: headers,
        },
      );

      const dataEmployee: ApiResponseEmployee = await response.json();

      if (response.ok) {
        setDataEmployee(dataEmployee.data);
        setErrorEmployee('');
      } else {
        setErrorEmployee(response.statusText);
      }
    } catch (error) {
        setErrorEmployee('خطا در ارتباط با سرور');
    }
  };

  return {
    errorPeriod,
    errorSupervisor,
    errorEmployee,
    dataPeriod,
    dataSupervisor,
    dataEmployee,
    getAdminPeriodListData,
    getSupervisorListData,
    getEmployeeListData,
  };
}

export default AssignmentSupervieorGetData;
