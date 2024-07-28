import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import AddAdmin from './pages/AddAdmin';
import AddMember from './pages/AddMember';
import PrivateRoute from './PrivateRoute';
import AddCompany from './pages/Form/Corporation';
import OrganizationUnit from './pages/Form/OrganizationUnit';
import OrganizationLevel from './pages/Form/OrganizationLevel';
import AddUser from './pages/Form/AddUser';
import AdminUser from './pages/Form/AdminUser';
import Corporation from './pages/Form/Corporation';
import UpdateUser from './pages/Form/UpdateUser';
import AdminPeriod from './pages/Form/AdminPeriod';
import AssignmentSupervisor from './pages/Form/AssignmentSupervisor';
import AssignmentSupervisorAdd from './pages/Form/AssignmentSupervisorAdd';
import EvalParam from './pages/Form/EvalParam';
import EvalIndicator from './pages/Form/EvalIndicator';
import EvalIndicatorGuyeh from './pages/Form/EvalIndicatorGuyeh';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        index
        path="/login"
        element={
          <>
            <PageTitle title="ورود" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="داشبورد " />
                  <ECommerce />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/addAdmin"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="افزودن ادمین" />
                  <AddAdmin />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/update/:id"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="ویرایش اطلاعات ادمین" />
                  <UpdateUser />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/Member/company"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="شرکت ها" />
                  <Corporation />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/period"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="دوره ها" />
                  <AdminPeriod />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/Member/OrganizationUnit"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="واحد سازمانی" />
                  <OrganizationUnit />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/Member/OrganizationLevel"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="سطح سازمانی" />
                  <OrganizationLevel />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/Member"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="کاربرادمین" />
                  <AdminUser />
                </DefaultLayout>
              </>
            }
          />
        }
      />

      <Route
        path="/Assignment"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="انتساب افزودن" />
                  <AssignmentSupervisorAdd />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/evalParam"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="پارامتر های ارزیابی  " />
                  <EvalParam />
                </DefaultLayout>
              </>
            }
          />
        }
      />

      <Route
        path="/evalIndicator"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="شاخص های ارزیابی  " />
                  <EvalIndicator />
                </DefaultLayout>
              </>
            }
          />
        }
      />

      <Route
        path="/evalIndicator/evalIndicatorGuyeh/:id"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="گویه ها" />
                  <EvalIndicatorGuyeh />
                </DefaultLayout>
              </>
            }
          />
        }
      />

      <Route
        path="/Member/Add"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="افزودن کاربر" />
                  <AddUser />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <PrivateRoute
              element={
                <>
                  <DefaultLayout>
                    <PageTitle title="تقویم" />
                    <Calendar />
                  </DefaultLayout>
                </>
              }
            />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PrivateRoute
              element={
                <>
                  <DefaultLayout>
                    <PageTitle title="پروفایل" />
                    <Profile />
                  </DefaultLayout>
                </>
              }
            />
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <PrivateRoute
            element={
              <>
                {' '}
                <DefaultLayout>
                  <PageTitle title="عناصر فرم" />
                  <FormElements />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <PrivateRoute
            element={
              <>
                {' '}
                <DefaultLayout>
                  <PageTitle title="لایه های فرم" />
                  <FormLayout />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/tables"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="جداول" />
                  <Tables />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute
            element={
              <>
                <DefaultLayout>
                  <PageTitle title="تنظیمات" />
                  <Settings />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/chart"
        element={
          <PrivateRoute
            element={
              <>
                {' '}
                <DefaultLayout>
                  <PageTitle title="چارت پایه" />
                  <Chart />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <PrivateRoute
            element={
              <>
                {' '}
                <DefaultLayout>
                  <PageTitle title="هشدار ها" />
                  <Alerts />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <PrivateRoute
            element={
              <>
                {' '}
                <DefaultLayout>
                  <PageTitle title="دکمه ها" />
                  <Buttons />
                </DefaultLayout>
              </>
            }
          />
        }
      />
      {/*   <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="ثبت نام" />
              <SignUp />
            </>
          }
        />*/}
    </Routes>
  );
};

export default App;
