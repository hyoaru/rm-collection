import Link from "next/link"

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer"
import MainNavStart from "@components/base/MainNavStart"
import MainNavEnd from "@components/base/MainNavEnd"
import getCartByUser from "@services/collection/getCartByUser"

const navigation = [
  { name: 'Collection', link: '/' },
  { name: 'Earrings', link: '/collection/earring' },
  { name: 'Necklaces', link: '/collection/necklace' },
  { name: 'Bracelets', link: '/collection/bracelet' },
  { name: 'Rings', link: '/collection/ring' },
]

export default async function Header() {
  const userState = await getUserStateServer()
  const cart = await getCartByUser({userId: userState?.userStateAuth?.id})

  return (
    <>
      <header className="sticky top-0 pt-4 z-50 backdrop-filter backdrop-blur-lg backdrop-brightness-150">
        <div className="md:container mx-auto px-4 pb-1">
          <nav className="flex items-center">
            <MainNavStart navigation={navigation} />

            {/* Main nav middle */}
            <div id="main-nav-center" className="flex justify-center items-center w-4/6 xl:w-1/3">
              <Link href={'/'} className="hidden uppercase text-lg sm:block sm:text-xl">Rea Mariz Collection</Link>
              <Link href={'/'} className="flex uppercase text-lg sm:hidden md:text-xl">RM Collection</Link>
            </div>

            <MainNavEnd userState={userState} cart={cart} />
          </nav>
        </div >
      </header >
    </>
  )
}
