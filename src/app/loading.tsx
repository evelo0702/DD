export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-80vh  text-gray-800">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-4 text-3xl font-medium">
        서버에서 데이터를 불러오는중 입니다
      </p>
    </div>
  );
}
