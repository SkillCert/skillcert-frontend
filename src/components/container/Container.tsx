import React from "react";
import clsx from "clsx";
import styles from "./Container.module.css";

const Container = ({
  children,
  alt,
  legend,
}: {
  children: React.ReactNode;
  alt?: boolean;
  legend?: boolean;
}) => {
  return (
    <div
      className={clsx(
        styles.container,
        alt && styles.containerAlt,
        legend && styles.containerLegend
      )}
    >
      {children}
    </div>
  );
};

export default Container;
