import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const getCurrentPathParts = () => {
    const path = window.location.pathname;
    return path.split('/').filter((part) => part !== '');
  };

  const pathParts = getCurrentPathParts();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              داشبورد /
            </Link>
          </li>
          {pathParts.length >= 2 && pathParts[0] === 'Member' ? (
            <>
              <li>
                <Link className="font-medium" to="/Members">
                  کاربران /
                </Link>
              </li>
              <li className="font-medium text-primary">{pageName}</li>
            </>
          ) : pathParts.length >= 2 && pathParts[0] === 'update' ? (
            <>
              <li>
                <Link className="font-medium" to="/Members">
                  کاربران /
                </Link>
              </li>
              <li className="font-medium text-primary">{pageName}</li>
            </>
          ) : (
            <li className="font-medium text-primary">{pageName}</li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
