import { useCallback, useState } from 'react'

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement('textarea')
  tempTextArea.value = text
  document.body.appendChild(tempTextArea)
  tempTextArea.select()
  document.execCommand('copy')
  document.body.removeChild(tempTextArea)
}

export default function useCopyToClipboard(): [string | null, (value: string | null) => void] {
  const [state, setState] = useState<string | null>(null)

  const copyToClipboard = useCallback((value: string | null) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          if (value) {
            await navigator.clipboard.writeText(value)
          }
          setState(value)
        } else {
          throw new Error('writeText not supported')
        }
      } catch (_err) {
        if (value) {
          oldSchoolCopy(value)
        }
        setState(value)
      }
    }

    handleCopy()
  }, [])

  return [state, copyToClipboard]
}
