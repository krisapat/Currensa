'use client'
import { ModeToggle } from "./navbarcom/darkmode/Darkmode"
import DropdownListsMenu from "./navbarcom/DropdownListsMenu"
import Logo from "./navbarcom/Logo"

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between p-4 w-full h-20">
        <Logo />
        <div className="flex space-x-2">
          <DropdownListsMenu />
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
