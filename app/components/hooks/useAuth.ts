"use client"

import { useState, useEffect } from "react"

export function usePersistedAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedLoginState = localStorage.getItem("adminLoggedIn")
    setIsLoggedIn(storedLoginState === "true")
  }, [])

  const login = () => {
    localStorage.setItem("adminLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsLoggedIn(false)
  }

  return { isLoggedIn, login, logout }
}
