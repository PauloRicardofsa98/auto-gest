const Loading = () => {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-2xl font-bold text-primary">K</span>
      </div>
    </div>
  );
};

export default Loading;
