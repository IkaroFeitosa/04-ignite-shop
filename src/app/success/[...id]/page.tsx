export default function SuccessPageWithId({
  params,
}: {
  params: { id: string | string[] };
}) {
  return (
    <h1>
      Success Page with ID:{" "}
      {Array.isArray(params.id) ? params.id.join(", ") : params.id}
    </h1>
  );
}
