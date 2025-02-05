interface Props {
  title: string
  children: React.ReactNode
  className?: string
}

export default function AccountContainer({ children, title, className }: Props) {
  return (
    <section className={className}>
      <h2 className="text-lg font-medium">{title}</h2>
      {children}
    </section>
  )
}
