export default function ${{values.remoteAppName | capitalize}}Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-yellow-100">{children}</div>
        </>
    );
}
