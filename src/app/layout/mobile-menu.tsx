'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export type MenuItemType = {
  displayText: string
  href: string
  isMobileOnly: boolean
  isExternal?: boolean
}

interface MobileMenuProps {
  menuItems: MenuItemType[]
  pathname: string
}

export default function MobileMenu({ menuItems, pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="lg:hidden">
      {/* Botón del menú hamburguesa */}
      <button
        onClick={toggleMenu}
        className="inline-flex items-center justify-center p-2 text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        aria-expanded="false"
      >
        <span className="sr-only">Abrir menú principal</span>
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-20 z-50 bg-background shadow-lg">
          <div className="px-2 pb-3 pt-2 sm:px-3">
            {menuItems.map((menuItem, index) => (
              <Link
                key={`${menuItem.displayText}-mobile-${index}`}
                className={`block px-3 py-2 text-base font-medium text-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none ${
                  pathname === menuItem.href &&
                  'pointer-events-none underline decoration-primary decoration-[1.5px] underline-offset-[6px]'
                }`}
                href={menuItem.href}
                target={menuItem.isExternal ? '_blank' : ''}
                onClick={() => setIsOpen(false)}
              >
                {menuItem.displayText}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}