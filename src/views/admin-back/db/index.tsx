import React from "react";

interface indexProps {
  data: any;
}

const index: React.FC<indexProps> = ({ data }) => {
  return (
    <>
      <h1>{data}</h1>
    </>
  );
};

export default index;
