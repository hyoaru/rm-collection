import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@components/ui/dropdown-menu"
import { Button } from "@components/ui/button"
import Link from "next/link"
import { AlignLeft, Search, ShoppingCart, User, Lock } from "lucide-react"

const navigation = [
  { name: 'Collection', link: '/' },
  { name: 'Earings', link: '/' },
  { name: 'Necklaces', link: '/' },
  { name: 'Rings', link: '/' },
]

export default function Header() {
  return (
    <>
      <header className="border-b sticky top-6 mt-6 z-50">
        <div className="md:container mx-auto px-4 pb-2 ">
          <nav className="flex items-center">
            <div id="main-nav-start" className="flex justify-start items-center w-1/6 xl:w-1/3">
              <div id="main-nav-start-expanded" className="hidden xl:flex">
                {navigation.map((nav, index) => (
                  <Button variant={'link'} key={`MainNavStartLinkExpanded-${index}`} className={'px-2'}>
                    <Link href={nav.link} className="uppercase font-light">{nav.name}</Link>
                  </Button>
                ))}
              </div>
              <div id="main-nav-start-collapsed" className="flex items-center xl:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AlignLeft size={17} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side={'bottom'} align={'start'}>
                    <DropdownMenuLabel className={'uppercase flex gap-2 items-center'}>
                      <Search size={17} />
                      <span className="text-muted-foreground font-light">Search</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {navigation.map((nav, index) => (
                      <DropdownMenuItem key={`MainNavStartLinkCollapsed-${index}`}>
                        <Link href={nav.link} className="uppercase font-light">{nav.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div id="main-nav-center" className="flex justify-center items-center w-4/6 xl:w-1/3">
              <Link href={'/'} className="hidden uppercase text-lg sm:block sm:text-2xl">Rea Mariz Collection</Link>
              <Link href={'/'} className="flex uppercase text-lg sm:hidden md:text-2xl">RM Collection</Link>
            </div>
            <div id="main-nav-end" className="flex justify-end items-center w-1/6 xl:w-1/3">
              <div id="main-nav-end-expanded" className="hidden xl:flex">
                <Button variant={'link'} className={'px-2'}>
                  <Link href={"/"} className="uppercase font-light">Search</Link>
                </Button>
                <Button variant={'link'} className={'px-2'}>
                  <Link href={"/"} className="uppercase font-light">Cart</Link>
                </Button>
                <Button variant={'link'} className={'px-2'}>
                  <Link href={"/"} className="uppercase font-light">Login</Link>
                </Button>
              </div>
              <div id="main-nav-end-collapsed" className="flex xl:hidden">
                <Button variant={'ghost'} className={'px-1'}>
                  <Link href={"/"} className=""><ShoppingCart size={17} /></Link>
                </Button>
                <Button variant={'ghost'} className={'px-1'}>
                  <Link href={"/"} className=""><User size={17} /></Link>
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
