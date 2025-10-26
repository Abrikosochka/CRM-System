import * as React from "react";
import type { SVGProps } from "react";
const SvgDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 -0.5 21 21"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M7.35 16h2.1V8h-2.1zm4.2 0h2.1V8h-2.1zm-6.3 2h10.5V6H5.25zm2.1-14h6.3V2h-6.3zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4z"
    />
  </svg>
);
export default SvgDelete;
