import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#0F0F0F"
      d="M8.002 9.416a1 1 0 1 1 1.414-1.414l2.59 2.59 2.584-2.584a1 1 0 1 1 1.414 1.414l-2.584 2.584 2.584 2.584a1 1 0 0 1-1.414 1.414l-2.584-2.584-2.584 2.584a1 1 0 0 1-1.414-1.414l2.584-2.584z"
    />
    <path
      fill="#0F0F0F"
      fillRule="evenodd"
      d="M23 4a3 3 0 0 0-3-3H4a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3zm-2 0a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClose;
