'use client'

import React,{ useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {useToast} from '@/components/hooks/use-toast'
import Link from 'next/link'

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting,setIsSubmitting] = useState(false)
  const router = useRouter()
  const {toast} = useToast()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name,value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!isLoaded) {
      return
    }

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        setIsSubmitting(false)
        toast({
          title: "Success",
          description: "Successfully logged in",
        })
        router.push('/dashboard')
      } else {
        toast({
          title: "Failure",
          description: "Error logging in",
          variant: "destructive"
        })
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      toast({
        title: "Failure",
        description: "Error logging in",
        variant: "destructive"
      })
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <>
      <div className=' flex justify-center items-center min-h-screen'>
    <div className="w-full max-w-md p-8 space-y-8 bg-[#1E3E62] rounded-lg shadow-md">
      <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Cloud Notes
          </h1>

          <p className="mb-4">Sign In to Start Making Collaborative Notes</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6 text-white'>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" className='placeholder:text-white' value={formData.email} onChange={handleChange}/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" name='password' id="password" placeholder="Password" className='placeholder:text-white' value={formData.password} onChange={handleChange}/>
        </div>
        
        <Button type="submit" className='bg-[#FF6500] text-white' disabled = {isSubmitting}>  
              {
                isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait...</> : "Sign In"
              }
        </Button>
        <div className="text-center mt-4 text-white">
              <p>
                New to Cloud Notes{' '}
                <Link href={'/sign-up'} className="text-blue-600 hover:text-blue-800">Sign Up</Link>
              </p>
        </div>
      </form>
    </div>
      </div>
    </>
  )
}