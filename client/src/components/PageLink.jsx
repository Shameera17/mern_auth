import React from "react";
import { Link } from "react-router-dom";

export default function PageLink({ to, label, type }) {
  return (
    <Link to={to}>
      {type === "heading" ? (
        <h1 className="font-bold ">{label}</h1>
      ) : (
        <li>{label}</li>
      )}
    </Link>
  );
}
