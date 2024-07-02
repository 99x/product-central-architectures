import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default function Navbar() {
    // const router = useRouter();

    // const handleRemoteRedirect = (path: string) => (e: React.MouseEvent) => {
    //   e.preventDefault();
    //   router.push(path);
    // };

    return (
        <nav className="bg-gray-400 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl">FH Host Nav</h1>
                <ul className="flex space-x-4">
                    <Link className="hover:text-blue-500" href="/">
                        Home
                    </Link>
                    <Link className="hover:text-blue-500" href="/${{values.remoteAppName}}">
                    ${{values.remoteAppName}} App
                    </Link>
                    <Link className="hover:text-blue-500" href="/fetch-test">
                        Test Fetch
                    </Link>
                    <Link className="hover:text-blue-500" href="#">
                        Login
                    </Link>
                </ul>
            </div>
        </nav>
    );
}
