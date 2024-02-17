import Link from "next/link"

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer"
import MainNavStart from "@components/base/NavigationBar/MainNavStart"
import MainNavEnd from "@components/base/NavigationBar/MainNavEnd"
// import getCartByUser from "@services/collection/getCartByUser"
import { MAIN_NAVIGATION as navigation } from "@constants/base/constants"

export default async function Header() {
  const authenticatedUser = await getUserStateServer()
  // const cart = await getCartByUser({ userId: userState?.userStateAuth?.id })

  return (
    <>
      <header className="sticky top-0 pt-4 z-50 backdrop-filter backdrop-blur-lg backdrop-brightness-150">
        <div className="md:container mx-auto px-4 pb-1">
          <nav className="flex items-center">
            <MainNavStart />

            {/* Main nav middle */}
            <div id="main-nav-center" className="flex justify-center items-center w-4/6 xl:w-1/3">
              <Link href={'/'} className="hidden uppercase text-lg sm:block sm:text-xl">Rea Mariz Collection</Link>
              <Link href={'/'} className="flex uppercase text-lg sm:hidden md:text-xl">RM Collection</Link>
            </div>

            <MainNavEnd authenticatedUser={authenticatedUser} />
          </nav>
        </div >
      </header >
    </>
  )
}