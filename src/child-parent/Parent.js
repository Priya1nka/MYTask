import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
  });

  const dataFromChild = (data) => {
    setData(data);
  };

  return (
    <>
      <p>
        I am Coming from Child Component : My name is {data.name} . I am From
        {data.address}
      </p>

      <Child sendToParent={dataFromChild} />
    </>
  );
};
export default Parent;
