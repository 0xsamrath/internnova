// import React from 'react'
import { useMutation, Routes } from "blitz"
import { Logo } from "./Logo"
// import { FaTwitter, FaDiscord } from 'react-icons/fa'
import { Link } from "blitz"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

// const Navbar = () => {
//   return (
//     <div className="flex items-center justify-between w-full">
//       <Link href="/" passHref={true}>
//         <a>
//           <Logo />
//         </a>
//       </Link>

//       <div className="flex gap-2 items-center">
//         <UserInfo />
//       </div>
//     </div>
//   )
// }
const AuthSection = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <button className="py-2 px-4 bg-transparent text-variant-2 font-semibold border border-variant-2 rounded hover:bg-variant-2 hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0 mr-4">
            Sign Up
          </button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <button className="text-variant-2 hover:underline mr-4">
            <strong>Login</strong>
          </button>
        </Link>
      </>
    )
  }
}

// export default Navbar
//
//
export default function Navbar() {
  return (
    <div className="w-[100%] h-14 font-montserrat flex items-center justify-between gap-2 select-none mx-2">
      <h1 className="text-2xl tracking-wide font-extrabold md:text-lg">
        <Logo />
      </h1>
      <div className="flex bg-iris-10 dark:bg-dark-bgMuted1 w-44 h-11 rounded-lg items-center justify-center gap-2">
        <AuthSection />
      </div>
    </div>
  )
}
