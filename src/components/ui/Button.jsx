import { Link } from 'react-router-dom'

// Variants map to the plan's two site-wide actions:
//   primary = filled terracotta (Order Now), outline = outlined (Book a Table).
// `outlineDark` is the outlined style for use on cream surfaces.
const base =
  'inline-flex items-center justify-center rounded-full font-sans font-semibold ' +
  'transition-[background-color,color,box-shadow,transform] duration-300 ease-out ' +
  'active:scale-[0.98] select-none whitespace-nowrap'

const variants = {
  primary:
    'bg-terracotta text-on-terracotta hover:bg-terracotta-deep hover:shadow-[0_0_28px_rgba(224,122,60,0.35)]',
  outline:
    'border-2 border-cream/70 text-cream hover:bg-cream hover:text-espresso',
  outlineDark:
    'border-2 border-espresso text-espresso hover:bg-espresso hover:text-cream',
}

const sizes = {
  md: 'min-h-12 px-6 text-base',
  lg: 'min-h-14 px-8 text-[1.0625rem]', // large tap target for the hero CTAs
}

export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>
  return <button type="button" className={cls} {...rest}>{children}</button>
}
