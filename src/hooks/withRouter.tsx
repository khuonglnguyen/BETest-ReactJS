import { useEffect } from 'react';
import { useNavigate as useNavigateCore } from 'react-router';

export function useNavigate(url: any) {
  const navigate = useNavigateCore();
  useEffect(() => {
    navigate(url);
  })
  return navigate;
}


export const withRouter = (WrappedComponent: any) => (props: any) => {
  const navigate = useNavigateCore();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
      // etc...
    />
  );
};