export function ErrorState({
  message = "Something went wrong. Try refreshing the page.",
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-negative-subtle border border-border rounded-lg px-[16px] py-4">
        <p className="text-[0.875rem] text-negative">{message}</p>
      </div>
    </div>
  );
}
