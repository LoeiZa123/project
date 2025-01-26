export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4">
    <div className="inline-block max-w-lg text-center">
      {children}
    </div>
  </section>
  );
}
