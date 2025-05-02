import { quicksand } from "@/utils/font"
import Link from "next/link"

const Logo = () => {
  return (

    <Link href={'/'} className={`${quicksand.className} text-2xl font-bold`}>Finverse</Link>

  )
}
export default Logo