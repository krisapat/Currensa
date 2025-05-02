'use client'
import { Undo2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button"
import Link from "next/link"

export type Category = 'all' | 'us' | 'th' | 'cn' | 'metal'| 'crypto' |'unknow'

export default function StockFilter({
  search,
  setSearch,
  category,
  setCategory,
}: {
  search: string
  setSearch: (val: string) => void
  category: Category
  setCategory: (val: Category) => void
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
      <Input
        placeholder="Find assets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      <Select value={category} onValueChange={(val: string) => setCategory(val as Category)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ALL</SelectItem>
          <SelectItem value="us">US</SelectItem>
          <SelectItem value="th">TH</SelectItem>
          <SelectItem value="cn">CN</SelectItem>
          <SelectItem value="metal">Metal</SelectItem>
          <SelectItem value="crypto">Crypto</SelectItem>
          <SelectItem value="unknow">Unknow</SelectItem>
        </SelectContent>
      </Select>
      <Button className='bg-white dark:bg-black/30'>
        <Link href={'/'}><Undo2 className='text-black dark:text-white'/></Link>
      </Button>
    </div>
  )
}
