import * as React from "react";

export function SharePropsWithChildren({ children, ...props }) {
  const renderChildren = () => {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        ...props
      })
    );
  };
  return <>{renderChildren()}</>;
}
