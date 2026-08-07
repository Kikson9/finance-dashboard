import Overview from "../../pages/Overview";

export default function MainContent() {
  return (
    <main
      style={{
        flex: 1,
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        padding: "40px 48px",
        overflowY: "auto",
      }}
    >
      <Overview />
    </main>
  );
}
