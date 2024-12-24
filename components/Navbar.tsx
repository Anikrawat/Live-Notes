'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button';
import { SignedIn, UserButton, useSession } from '@clerk/nextjs';
import Image from 'next/image';
import logo from '@/public/images/logo.png'

const Navbar = () => {

  const {session} = useSession()

  return (
      <nav className="p-3 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="flex items-center text-xl font-bold mb-4 md:mb-0">
        <Image src={logo} alt='Notes' width={60} height={25}/>
          Live Notes
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {session.user?.username || session.user?.emailAddresses[0].emailAddress}
            </span>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </>
        ) : (
          <div className='w-fit flex flex-row gap-4'>
            <Link href="/sign-in">
              <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
            </Link>
            <Link href="/sign-up">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Register</Button>
          </Link>
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar