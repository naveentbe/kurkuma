export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-kurkuma-charcoal">
      <div className="text-center">
        <div className="font-display text-3xl text-kurkuma-gold mb-4 animate-pulse">
          Kurkuma
        </div>
        <div className="w-12 h-0.5 bg-kurkuma-gold/30 mx-auto overflow-hidden rounded-full">
          <div className="w-full h-full bg-kurkuma-gold animate-[shimmer_1.5s_ease-in-out_infinite] origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
