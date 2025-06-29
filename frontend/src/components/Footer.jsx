export default function Footer() {
    return (
        <footer className="bg-gray-800 py-6 text-white">
            <div className="mx-auto flex flex-col items-center justify-between gap-2 px-4 md:gap-4">
                <div className="text-center text-[16px] font-normal">
                    SmartCart &copy; {new Date().getFullYear()}
                </div>
                <div className="flex justify-center gap-4 text-sm md:gap-8">
                    <a href="/about" className="transition hover:text-gray-400">
                        About
                    </a>
                    <a
                        href="/contact"
                        className="transition hover:text-gray-400"
                    >
                        Contact
                    </a>
                    <a
                        href="/privacy"
                        className="transition hover:text-gray-400"
                    >
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    )
}
