const Loading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600" />
        </div>

        <p className="text-sm font-medium text-gray-500 animate-pulse">
          Loading studios...
        </p>
      </div>
    </div>
  );
};

export default Loading;
