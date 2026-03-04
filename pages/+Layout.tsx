import "./Layout.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-content">
      {children}
    </div>
  );
}
