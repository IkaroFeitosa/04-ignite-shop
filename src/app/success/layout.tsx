import { PropsWithChildren } from "react";

export default function SuccessLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1>Success Layout</h1>
      {children}
    </div>
  );
}
