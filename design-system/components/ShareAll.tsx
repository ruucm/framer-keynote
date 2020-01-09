import * as React from "react";

export function ShareAllPropsWithChildren({ children, selectedTheme }) {
  console.log("children", children);
  const renderChildren = () => {
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        selectedTheme: selectedTheme
      })
    );
  };
  return <div>{renderChildren()}</div>;
}

console.log("ShareAllPropsWithChildren", ShareAllPropsWithChildren);
