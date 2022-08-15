import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const Page = ({ to, icon, activeIcon, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
      {icon? (activeIcon? (isActive? activeIcon: icon): icon) : null}
        {children}
      </Link>
    </li>
  );
};

export default Page;
