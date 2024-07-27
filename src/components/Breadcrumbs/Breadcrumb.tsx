import { Link, useLocation } from 'react-router-dom';
import { breadcrumbMappings } from './BreadcrumbMappings'; // Adjust the path as needed

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Function to create breadcrumb items based on the path
  const getBreadcrumbItems = () => {
    const pathParts = pathname.split('/').filter(part => part !== '');
    const breadcrumbItems = pathParts.map((part, index) => {
      const linkPath = `/${pathParts.slice(0, index + 1).join('/')}`;
      return {
        name: breadcrumbMappings[linkPath] || part, // Use mapped name or fallback to part
        path: linkPath,
      };
    });

    // Ensure to include the last part of the breadcrumb as a non-link item
    if (breadcrumbItems.length > 0) {
      breadcrumbItems[breadcrumbItems.length - 1].isCurrent = true;
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              {breadcrumbMappings['/']}
            </Link>
          </li>
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index < breadcrumbItems.length - 1 ? (
                <>
                  <Link className="font-medium" to={item.path}>
                    {item.name} /
                  </Link>
                </>
              ) : (
                <span className="font-medium text-primary">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
