const Setting = ({ isActive }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.75 7.35083V12.64C0.75 14.5833 0.75 14.5833 2.58333 15.8208L7.625 18.7358C8.38583 19.1758 9.62333 19.1758 10.375 18.7358L15.4167 15.8208C17.25 14.5833 17.25 14.5833 17.25 12.6492V7.35083C17.25 5.41667 17.25 5.41667 15.4167 4.17917L10.375 1.26417C9.62333 0.824167 8.38583 0.824167 7.625 1.26417L2.58333 4.17917C0.75 5.41667 0.75 5.41667 0.75 7.35083Z"
        className={`fill-${isActive ? "foreground" : "none"} stroke-${isActive ? "foreground" : "foreground-secondary"}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.75C10.5188 12.75 11.75 11.5188 11.75 10C11.75 8.48122 10.5188 7.25 9 7.25C7.48122 7.25 6.25 8.48122 6.25 10C6.25 11.5188 7.48122 12.75 9 12.75Z"
        className={`stroke-${isActive ? "background" : "foreground-secondary"}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Setting;
