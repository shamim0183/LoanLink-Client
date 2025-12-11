import { useEffect } from "react"

const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title
      ? `${title}`
      : "LoanLink - Microloan Management System"

    return () => {
      document.title = prevTitle
    }
  }, [title])
}

export default useDocumentTitle
