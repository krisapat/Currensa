import { AlignJustify } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { Links } from '@/utils/links';



const DropdownListsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'}>
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
          {
            Links.map((item, number) => {
              return (
                <DropdownMenuItem key={number}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              )
            })
          }
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
export default DropdownListsMenu