import plugin from 'tailwindcss/plugin'

const customPlugin = plugin(function ({ addComponents, addVariant }) {
  addComponents({
    '.container': {
      maxWidth: '100%',
      '@screen sm': {
        maxWidth: 'calc(510px + var(--container-gutter))',
      },
      '@screen md': {
        maxWidth: 'calc(690px + var(--container-gutter))',
      },
      '@screen lg': {
        maxWidth: 'calc(930px + var(--container-gutter))',
      },
      '@screen xl': {
        maxWidth: 'calc(1110px + var(--container-gutter))',
      },
      '@screen 2xl': {
        maxWidth: 'calc(1340px + var(--container-gutter))',
      },
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'calc(var(--container-gutter) * 0.5)',
      paddingRight: 'calc(var(--container-gutter) * 0.5)',
    },
    '.container-none': {
      maxWidth: 'none',
      marginLeft: '0',
      marginRight: '0',
      paddingLeft: '0',
      paddingRight: '0',
    },
  })

  addVariant('second-last-of-type', '&:nth-last-of-type(2)')
})

export default customPlugin
