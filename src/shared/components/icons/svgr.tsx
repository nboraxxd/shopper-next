import { LucideProps } from 'lucide-react'

interface Props extends React.ComponentProps<'svg'> {
  icon:
    | React.FC<React.SVGProps<SVGElement>>
    | React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

export default function Svgr({ icon: Icon, ...rest }: Props) {
  return <Icon width={24} height={24} strokeWidth={1.5} {...rest} />
}
