
function AppLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white py-4 px-6 shadow">
                <h1 className="text-xl font-bold">Header</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-6 py-4 bg-gray-100">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-3 px-6 text-center">
                <p>&copy; 2025 My App. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default AppLayout
