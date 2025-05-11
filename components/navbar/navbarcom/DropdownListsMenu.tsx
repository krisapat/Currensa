'use client'
import { AlignJustify, X } from 'lucide-react';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false); // ติดตามสถานะเปิด/ปิด

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="transition-transform duration-300">
          {/* สลับไอคอน */}
          {open ? <X className="transition-all duration-300 rotate-90" /> : <AlignJustify className="transition-all duration-300" />}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          Links.map((item, number) => (
            <DropdownMenuItem asChild key={number}>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownListsMenu;
