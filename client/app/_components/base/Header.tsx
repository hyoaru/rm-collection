import Link from "next/link"

// App imports
import { getUserStateServer } from "@services/authentication/getUserStateServer"
import MainNavStart from "@components/base/NavigationBar/MainNavStart"
import MainNavEnd from "@components/base/NavigationBar/MainNavEnd"

export default async function Header() {
  const authenticatedUser = await getUserStateServer()

  return (
    <>
      <header className="sticky top-0 pt-4 z-50 backdrop-filter backdrop-blur-lg ">
        <div className="px-4 mx-auto md:container pb-1">
          <nav className="flex items-center">
            <MainNavStart />

            {/* Main nav middle */}
            <div id="main-nav-center" className="flex justify-center items-center w-4/6 md:w-2/6 xl:w-1/3">
              <Link href={'/'} className="block font-bold text-lg text-primary sm:text-2xl">Rea Mariz Collection</Link>
            </div>

            <MainNavEnd authenticatedUser={authenticatedUser} />
          </nav>
        </div >
      </header >
    </>
  )
}