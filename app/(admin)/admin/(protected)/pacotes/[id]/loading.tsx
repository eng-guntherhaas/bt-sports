export default function LoadingEditarPacote() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-6 w-48 rounded bg-gray-300" />

      <div className="space-y-4">
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-24 rounded bg-gray-200" />
        <div className="h-24 rounded bg-gray-200" />
      </div>

      <div className="flex gap-3">
        <div className="h-10 w-32 rounded bg-gray-300" />
        <div className="h-10 w-32 rounded bg-gray-300" />
      </div>
    </div>
  );
}
