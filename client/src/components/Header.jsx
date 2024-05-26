import React from "react";
import PageLink from "./PageLink";

export default function Header() {
  return (
    <div className=" bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <PageLink to={"/"} label={"Auth App"} type={"heading"} />
        <ul className="flex gap-4">
          <PageLink to={"/"} label={"Home"} />
          <PageLink to={"/about"} label={"About"} />
          <PageLink to={"/sign-in"} label={"Sign In"} />
        </ul>
      </div>
    </div>
  );
}
