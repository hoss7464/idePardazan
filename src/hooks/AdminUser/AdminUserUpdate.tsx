import { useState } from 'react';

interface ApiResponse {
  error?: string;
  doneUpdate?:string;
}

function AdminUserUpdate() {
  const [errorAdd, setError] = useState('');
  const [doneUpdate, setDoneUpdate] = useState('');

  const token = localStorage.getItem('token');

  const UpdateAdminUser = async (
    id:string,
    phone_number: string,
    full_name:string,
    email: string,
    personnel_code: string,
    gender: number,
    marital_status: number,
    birth_date: Date,
    employeement_date: Date,
    education: number,
    education_relationship: number,
    university_level: number,
    corporation_name: number,
    organization_unit_title: number,
    organization_level_title: number,
    job_title: string,
    is_supervisor: boolean,
    password: string,
  ) => {
    try {
      const headers = new Headers();
      if (token) {
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + token);
      }

      const response = await fetch(
        `https://mqtt-broker.ir/api/admin/user/${id}/update`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            phone_number,
            full_name,
            email,
            personnel_code,
            gender,
            marital_status,
            birth_date,
            employeement_date,
            education,
            education_relationship,
            university_level,
            corporation_name,
            organization_unit_title,
            organization_level_title,
            job_title,
            is_supervisor,
            password,
          }),
        },
      );

      const data: ApiResponse = await response.json();

      if (response.ok) {
        setError('');
        setDoneUpdate(" عملیات با موفقیت انجام شد!")
        window.location.href = "/Members";

      } else {
        setError(data.error || response.statusText);
      }
    } catch (error) {
      setError('خطا در ارتباط با سرور');
      console.error(error);
    }
  };

  return { errorAdd, UpdateAdminUser, doneUpdate };
}

export default AdminUserUpdate;
