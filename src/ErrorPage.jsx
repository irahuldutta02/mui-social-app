export default function ErrorPage({
  error = "Sorry, an unexpected error has occurred.",
}) {
  return (
    <div
      id="error-page"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <h1>Oops!</h1>
      <p>{error}</p>
    </div>
  );
}
