"use client";

import { createSvgIcon } from "@mui/material/utils";

const Blog = createSvgIcon(
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M3 10V14C3 14.6 3.4 15 4 15H6L10 18V6L6 9H4C3.4 9 3 9.4 3 10Z"
      fill="white"
    />
    <path
      d="M14 9.5C15.7 10.3 15.7 13.7 14 14.5"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>,
  "Blog"
);

export default Blog;
