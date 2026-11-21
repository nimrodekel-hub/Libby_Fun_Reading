export default function StarsBurst({ stars }) {
  if (!stars.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {stars.map(star => (
        <span
          key={star.id}
          className="absolute text-3xl animate-star-pop"
          style={{
            left: `${star.x}%`,
            top:  `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  );
}
