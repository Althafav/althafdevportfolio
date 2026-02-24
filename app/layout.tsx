import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: 'Althaf Mohamed Umer | Web Developer & UI/UX Designer',
    default: 'Portfolio | Web Developer & UI/UX Designer',
  },
  description: 'Pro portfolio of a Full Stack Developer specializing in Next.js, Tailwind CSS, and GSAP. Crafting immersive digital experiences with performance and accessibility in mind.',
  keywords: ['Web Developer', 'UI/UX Designer', 'Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Portfolio', 'Frontend Developer', 'Creative Developer'],
  authors: [{ name: 'Althaf Mohamed Umer' }],
  creator: 'Althaf Mohamed Umer',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://personal-portfolio.com',
    title: 'Portfolio | Web Developer & UI/UX Designer',
    description: 'Crafting immersive digital experiences with Next.js, Tailwind CSS, and GSAP.',
    siteName: 'Portfolio',
    images: [
      {
        url: '/images/og-image.jpg', // Placeholder, Next.js will look for opengraph-image.tsx/jpg
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Web Developer & UI/UX Designer',
    description: 'Crafting immersive digital experiences with Next.js, Tailwind CSS, and GSAP.',
    creator: '@webdev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} min-h-screen bg-white text-black selection:bg-[#FFD400] selection:text-black`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
