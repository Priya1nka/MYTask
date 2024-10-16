import React, { useState } from "react";

const Child = ({ sendToParent }) => {
  const [name, setname] = useState("");
  const [address, SetAddress] = useState("");

  const handleSubmit = () => {
    sendToParent({ name, address });
  };

  return (
    <>
      <input
        type="text"
        value={name}
        placeholder="Enter Name"
        onChange={(e) => setname(e.target.value)}
      />
      <input
        type="text"
        value={address}
        placeholder="Enter Address"
        onChange={(e) => SetAddress(e.target.value)}
      />
      <button onClick={handleSubmit}>Send Data To Parent</button>
    </>
  );
};
export default Child;
