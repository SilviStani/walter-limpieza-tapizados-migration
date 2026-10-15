const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  pin: <><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chat: <><path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.8a9 9 0 1 1 16.6-4.7Z" /><path d="M8 10h8M8 14h5" /></>,
  sofa: <><path d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M5 17v3m14-3v3" /><path d="M5 11a2 2 0 0 0-4 0v6h22v-6a2 2 0 0 0-4 0v3H5Z" /></>,
  bed: <><path d="M3 19V5m18 14v-8a2 2 0 0 0-2-2H3m0 7h18M7 9V6h5v3" /></>,
  chair: <><path d="M7 12V4h10v8M5 12h14v4H5Zm2 4-1 5m11-5 1 5" /></>,
  car: <><path d="m5 9 2-5h10l2 5M3 17v3m18-3v3M3 9h18v8H3Z" /><path d="M6 13h2m8 0h2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  expand: <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  rug: <><path d="M5 5h14v14H5zM8 8h8v8H8zM5 2v3m4-3v3m6-3v3m4-3v3M5 19v3m4-3v3m6-3v3m4-3v3" /></>,
  camera: <><path d="m8 5 2-2h4l2 2h5v15H3V5Z" /><circle cx="12" cy="12" r="4" /></>,
};

export default function Icon({ name, className = "" }) {
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.arrow}</svg>;
}
