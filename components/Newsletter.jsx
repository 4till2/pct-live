import React, { createRef } from "react";

import Subscribe from "../components/Subscribe";

const Newsletter = () => {
  return (
    <div>
      <div className="p-8  text-center">
        <div>
          <strong style={{ fontSize: "24px" }}>Subscribe?</strong>
          <p style={{ fontSize: "16px" }}>
            Get an email with site updates.
          </p>
        </div>
        <div>
          <Subscribe buttonText="Subscribe" keepLeft="" />
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default Newsletter;
