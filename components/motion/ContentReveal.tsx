/**
 * Smooth enter when content appears (e.g. after data load / opening a page).
 * The header inside stays still; only what follows it fades in (see `.page-enter` in globals.css).
 */
export default function ContentReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`page-enter ${className ?? ""}`}>{children}</div>;
}
