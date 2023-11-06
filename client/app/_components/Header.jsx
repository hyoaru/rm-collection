import Link from "next/link"

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer"
import MainNavStart from "@components/base/MainNavStart"
import MainNavEnd from "@components/base/MainNavEnd"

const navigation = [
  { name: 'Collection', link: '/' },
  { name: 'Earings', link: '/' },
  { name: 'Necklaces', link: '/' },
  { name: 'Rings', link: '/' },
]

export default async function Header() {
  const { userStateGeneral, userStateAuth } = await getUserStateServer()

  return (
    <>
      <header className="border-b sticky top-6 mt-6 z-50">
        <div className="md:container mx-auto px-4 pb-2 ">
          <nav className="flex items-center">
            <MainNavStart navigation={navigation} />

            {/* Main nav middle */}
            <div id="main-nav-center" className="flex justify-center items-center w-4/6 xl:w-1/3">
              <Link href={'/'} className="hidden uppercase text-lg sm:block sm:text-2xl">Rea Mariz Collection</Link>
              <Link href={'/'} className="flex uppercase text-lg sm:hidden md:text-2xl">RM Collection</Link>
            </div>

            <MainNavEnd userStateGeneral={userStateGeneral} userStateAuth={userStateAuth} />
          </nav>
        </div >
      </header >
    </>
  )
}
