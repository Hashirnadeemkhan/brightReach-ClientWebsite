import { FC } from "react"

const Wrapper:FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div>
      <div className="w-[90%] mx-auto px-2">
        {children}
      </div>
    </div>
  )
}

export default Wrapper
