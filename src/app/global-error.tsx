'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  console.log('global error', error);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>{String(error)}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}