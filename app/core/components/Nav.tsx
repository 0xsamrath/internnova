import { Link, useMutation, Image } from "blitz"
import { BsBookmark, BsFillMoonFill, BsPersonCircle, BsSearch } from "react-icons/bs"
import { RiSettingsLine } from "react-icons/ri"
import { HiLogout } from "react-icons/hi"
import logout from "../../auth/mutations/logout"
import { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useEffect, useRef } from "react"

export const Nav = () => {
  const [logoutMutation] = useMutation(logout)
  const [profileDD, setProfileDD] = useState(false)
  let avatar = "/images/default_profile_36.png"
  const currentUser = useCurrentUser()
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target !== profileRef.current) {
        setProfileDD(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return (
    <nav className="sticky top-0 left-0 w-full md:hidden w-screen flex items-center justify-between px-16 2xl:px-[10ch] bg-gray-50 h-[60px] header">
      <div className="flex items-center gap-10">
        <Link href="/">
          <a className="grid place-center">
            <Image
              src="/favicons/logo.png"
              alt="logo"
              height={40}
              width={40}
              className="object-cover"
            />
          </a>
        </Link>
        <div className="flex items-center">
          <input
            className="appearance-none px-5 md:w-60 py-2 text-[14px] search"
            placeholder="Search for internships"
          />
          <div className="bg-[rgba(0,0,0,0.05)] p-[1.2ch] grid place-center icon cursor-pointer">
            <BsSearch />
          </div>
        </div>
        <div className="flex items-center gap-6 text-[12px] lg:text-[14px] 2xl:text-[16px]">
          <Link href="/jobs">
            <a className="text-gray-500 hover:text-black">
              {currentUser && currentUser.role === "COMPANY" ? "All jobs" : "Find internships"}
            </a>
          </Link>
          {currentUser && currentUser.role === "COMPANY" && (
            <Link href="/jobs/create">
              <a className="text-gray-500 hover:text-black">Create Job</a>
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-[2ch]">
        <Link href="/bookmark">
          <a className="cursor-pointer">
            <BsBookmark className="mt-2 h-[21px] w-[21px] text-gray-500 hover:text-black" />
          </a>
        </Link>
        <div className="relative">
          <div
            className="h-[34px] w-[34px] rounded-full cursor-pointer hover:opacity-75"
            style={{
              backgroundImage: `url(${avatar})`,
              backgroundPosition: "50%",
            }}
            ref={profileRef}
            onClick={() => setProfileDD((prev) => !prev)}
          />
          <div
            className={`bg-white mt-2 absolute top-8 right-0 truncate dd rounded-sm ${
              profileDD ? "" : "hidden"
            }`}
            style={{ border: "1px solid #e6e6e6" }}
          >
            <div className="flex flex-col cursor-pointer text-[15px] dropdown">
              <Link
                href={`/${currentUser?.role === "INTERN" ? "interns" : "companies"}/${
                  currentUser?.username
                }`}
              >
                <a>
                  <BsPersonCircle className="h-[16px] w-[16px]" />
                  <p>Profile</p>
                </a>
              </Link>
              <Link href="/settings">
                <a>
                  <RiSettingsLine className="h-[17px] w-[17px]" />
                  <p>Settings</p>
                </a>
              </Link>
              <div className="dd-div">
                <BsFillMoonFill />
                <p className="w-full">Dark Mode</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(23,23,23, 0.2)" }} />
              <div className="dd-div" onClick={() => logoutMutation()}>
                <HiLogout />
                Log out
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
