export function Page() {
    return (
        <div className="h-screen bg-gray-100">
            <h1 className="text-center animate-pulse">${{values.coreAppName}} App</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div
                            className="bg-cover bg-center h-56 p-4"
                            style={{
                                backgroundImage: `url(https://source.unsplash.com/400x${200 + i}/?nature)`,
                            }}
                        ></div>
                        <div className="p-4">
                            <p className="font-semibold text-gray-600 text-sm">Category</p>
                            <p className="text-3xl text-gray-700">Beautiful Nature</p>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <div className="flex items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className="h-10 w-10 rounded-full" src="https://source.unsplash.com/100x100/?portrait" alt="test-image" />
                                <p className="text-sm text-gray-700 mx-2">Jimmy McGill</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
