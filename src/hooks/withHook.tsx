
const withHook = (Component: any, useHook?: Array<{useHook: any, hookName: string, value?: any}>) => {
  return (props: any) => {
    if (useHook && useHook.length) {
      let hookProps = {};
      useHook.forEach(({useHook, hookName, value}) => {
        const hookValue = value !== undefined ? useHook(value) : useHook();
        hookProps = Object.assign(hookProps, {[hookName]: hookValue})
      });
      return <Component {...props} {...hookProps} />;
    } else {
      return <Component {...props} />;
    }
  };
};

export default withHook;