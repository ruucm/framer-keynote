import * as React from "react";

export function SharePropsWithChildren({ children, ...props }) {
  const fn = child => React.cloneElement(child, { ...props });

  function renderRecursiveChildren(children, fn) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        child = React.cloneElement(child, {
          children: renderRecursiveChildren(child.props.children, fn)
        });
      }

      return fn(child);
    });
  }
  return <>{renderRecursiveChildren(children, fn)}</>;
}
