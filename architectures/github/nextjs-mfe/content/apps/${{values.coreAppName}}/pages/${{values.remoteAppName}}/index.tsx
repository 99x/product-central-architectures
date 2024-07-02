import dynamic from 'next/dynamic';
import ${{values.remoteAppName | capitalize | capitalize}}Layout from './_components/layout';

const ${{values.remoteAppName | capitalize}}Page = dynamic(() => import('apps/${{values.remoteAppName | capitalize}}/pages').then((mod) => mod.Page), {
    ssr: false,
});

export function Page() {
    return (
        <>
            <${{values.remoteAppName | capitalize}}Layout>
                <${{values.remoteAppName | capitalize}}Page />
            </${{values.remoteAppName | capitalize}}Layout>
        </>
    );
}

export default Page;
