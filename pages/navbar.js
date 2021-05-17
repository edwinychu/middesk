import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav class="flex-grow w-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-8 mt-5 flex items-baseline space-x-4">
                <Link href="/">
                  <a href="#" class="text-gray-800 hover:text-blue-600 pt-3 rounded-md text-lg font-lg">&larr; Home</a>  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}