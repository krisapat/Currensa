'use client'
import { Undo2 } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button"
import Link from "next/link"

export type Category = 'all' | 'us' | 'th' | 'cn' | 'metal' | 'crypto' | 'forex' | 'unknow'
const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'ALL' },
  { value: 'us', label: 'US' },
  { value: 'th', label: 'TH' },
  { value: 'cn', label: 'CN' },
  { value: 'metal', label: 'Metal' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'forex', label: 'Forex' },
  { value: 'unknow', label: 'Unknow' },
];

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
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button asChild className='bg-white dark:bg-black/30'>
        <Link href={'/'}><Undo2 className='text-black dark:text-white' /></Link>
      </Button>
    </div>
  )
}
