import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
        fontFamily: "var(--font-sans)",
      }}
    >
      {is404 ? (
        <>
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 12 }}>
            404
          </h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 24 }}>
            ページが見つかりませんでした。
          </p>
        </>
      ) : (
        <>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
            エラーが発生しました
          </h1>
          <p style={{ color: "var(--color-text-secondary)", marginBottom: 24 }}>
            申し訳ございません。問題が発生しました。
          </p>
        </>
      )}
      <a
        href="/"
        style={{
          color: "var(--color-accent)",
          fontWeight: 500,
          textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}
      >
        トップページに戻る
      </a>
    </div>
  );
}
