import React from "react";
import ContentLoader from "react-content-loader";

const TableRow = props => {
  const random = Math.random() * (7 - 0.7) + 0.7;
  return (
    <ContentLoader
      viewBox="0 0 1060 40"
      height={40}
      width={1060}
      speed={2}
      {...props}
    >
      <rect x="34" y="13" rx="6" ry="6" width={200 * random} height="12" />
      <rect x="653" y="13" rx="6" ry="6" width={78 * random} height="12" />
      <rect x="755" y="13" rx="6" ry="6" width={117 * random} height="12" />
      <rect x="938" y="13" rx="6" ry="6" width={83 * random} height="12" />
    </ContentLoader>
  );
};

const Table = props => (
  <React.Fragment>
    {Array(20)
      .fill("")
      .map((e, i) => (
        <TableRow
          key={i}
          style={{ opacity: Number(3 / i).toFixed(1) }}
          {...props}
        />
      ))}
  </React.Fragment>
);

export default Table;
