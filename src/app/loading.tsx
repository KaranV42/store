// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="loading-page">
      <div className="skeleton loading-header" />
      <div className="loading-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton loading-card-image" />
            <div className="skeleton loading-line" />
            <div className="skeleton loading-line-short" />
          </div>
        ))}
      </div>
    </div>
  );
}