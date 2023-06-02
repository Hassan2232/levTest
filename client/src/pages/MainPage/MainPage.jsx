import React from 'react'

export default function MainPage() {
  return (
    <div className="col-lg-8 mx-auto p-4 py-md-5">
        <header className="d-flex align-items-center pb-3 mb-5 border-bottom">
            <span className="fs-4">It's very easy to start</span>
        </header>

        <main>
            <h1 className="text-body-emphasis">Link shortening service</h1>
            <p className="fs-5 col-md-8">1. Sign up/Sign In</p>
            <p className="fs-5 col-md-8">2. Go to the right page</p>
            <p className="fs-5 col-md-8">3. Use the interface to paste the link and get its shortened value</p>
            <p className="fs-5 col-md-8">4. Enter the received link in the browser</p>
            <p className="fs-5 col-md-8">5. ...</p>
            <p className="fs-5 col-md-8">6. Profit!!</p>
        </main>
        <footer className="pt-5 my-5 text-body-secondary border-top">
            Created by Ujin B · © 2023
        </footer>
    </div>
  )
}
