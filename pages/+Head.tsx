import { useBrand } from "../hooks/useBrand";

export function Head() {
  const brand = useBrand();

  return (
    <>
      {/* Progressive enhancement flag for CSS (no-JS => no animations) */}
      <script>{"document.documentElement.classList.add('js');"}</script>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <meta
        property="og:title"
        content={`${brand.name} — Voice AGI Notepad Agent`}
      />
      <meta property="og:description" content={brand.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="icon" href="/assets/favicon.ico" />
      <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
    </>
  );
}
