export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="container mt-8 min-h-[calc(100vh-var(--header-height))]">
      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">{children}</div>
    </div>
  )
}
