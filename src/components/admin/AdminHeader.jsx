
import React, { useState } from 'react'

import { Menu,Bell,Settings } from 'lucide-react'
const AdminHeader = ({setSidebarOpen}) => {

  return (
    <>
        <header className="sticky top-0 left-0 right-0 z-20 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              className="lg:hidden p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="relative">
                <button className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <Bell className="h-5 w-5" />
                </button>
                
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
            </div>
          </div>
        </header>

    </>
  )
}

export default AdminHeader