import React from "react";

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <button
        type="button"
        onClick={() => {
          console.log("#");
        }}
      >
        #
      </button>
    </div>
  );
}
