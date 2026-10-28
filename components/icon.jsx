export default function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    github:
      "M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3A5.7 5.7 0 0 0 19.2 4c.2-1 .1-2.1-.3-3 0 0-1.3-.4-4.2 1.5a14.8 14.8 0 0 0-7.4 0C4.4.6 3.1 1 3.1 1c-.4.9-.5 2-.3 3a5.7 5.7 0 0 0-1.6 4c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 7 18v4",
    linkedin:
      "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4",
    instagram:
      "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm9 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm1-5h.01",
    home: "M3 11l9-8 9 8M5 10v11h14V10M9 21v-7h6v7",
    copy: "M9 9h12v12H9zM15 9V3H3v12h6",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    diagonal: "M6 18 18 6M6 6h12v12",
    download: "M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5",
    code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
    mail: "M3 5h18v14H3zM3 5l9 8 9-8",
    sun: "M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 1.4 1.4m10 10 1.4 1.4M5.6 18.4 1.4-1.4m10-10 1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    moon: "M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M6 18 18 6",
    search: "M21 21l-5-5m2-6a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
    book: "M4 4h6a3 3 0 0 1 2 2 3 3 0 0 1 2-2h6v15h-6a3 3 0 0 0-2 2 3 3 0 0 0-2-2H4zM12 6v15",
    globe:
      "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
