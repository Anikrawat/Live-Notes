'use client'

import React,{ useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import {useToast} from "@/components/hooks/use-toast";
import { ClerkAPIError } from '@clerk/types'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!isLoaded) return

    
    try {
      await signUp.create({
        username: formData.username,
        emailAddress: formData.email,
        password: formData.password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })
      toast({
        title: 'Success',
        description: 'Email sent successfully',
      })
      setVerifying(true)
      setIsSubmitting(false)
    } catch (err: unknown) {
      const error = err as ClerkAPIError
      toast({
        title: 'Failure',
        description: error.message,
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }


  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        toast({
          title: 'Success',
          description: 'User Verified',
        })
        router.push('/dashboard')
      } else {
        toast({
          title: 'Failure',
          description: 'Error verifying email',
          variant: 'destructive',
        })
      }
      setIsSubmitting(false)
    } catch (err) {
      const error = err as ClerkAPIError
      toast({
        title: 'Failure',
        description: error.message,
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  if (verifying) {
    return (
      <div className=' flex justify-center items-center min-h-screen'>
      <div className="w-full max-w-md p-8 space-y-8 bg-[#1E3E62] rounded-lg shadow-md">
      <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            OTP Verification
          </h1>
      </div>
      <form onSubmit={handleVerify} className='flex items-center flex-col gap-3'>
      <p className='text-white'>Enter your OTP Here</p>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={code} onChange={(value)=> setCode(value)} >
      <InputOTPGroup className='text-white'>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <Button type="submit" className='w-fit bg-[#FF6500] text-white' disabled = {isSubmitting}>
      {
        isSubmitting ? <><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please Wait...</> : "Submit"
      }
    </Button>
    </form>
    </div>
    </div>
    )
  }

  return (
    <div className=' flex justify-center items-center min-h-screen'>
    <div className="w-full max-w-md p-8 space-y-8 bg-[#1E3E62] rounded-lg shadow-md">
      <div className="text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Live Notes
          </h1>

          <p className="mb-4">Sign Up to Start Making Collaborative Notes</p>
      </div>
      <form onSubmit={handleSubmit} className='space-y-6 text-white'>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label htmlFor="username">Username</Label>
          <Input type="username" id="username" name='username' placeholder="Username" className='placeholder:text-white' value={formData.username} onChange={handleChange}/>
        </div>
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
                isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait...</> : "Sign Up"
              }
        </Button>
        <div className="text-center mt-4 text-white">
              <p>
                Already a member?{' '}
                <Link href={'/sign-in'} className="text-blue-600 hover:text-blue-800">Sign In</Link>
              </p>
        </div>
      </form>
    </div>
      </div>
  )
}