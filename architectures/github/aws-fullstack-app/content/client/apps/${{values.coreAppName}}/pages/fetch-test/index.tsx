'use client';

import { useState } from 'react';
import TestLayout from './_components/layout';

function FetchTestPage() {
    const [data, setData] = useState(null);
    const [showData, setShowData] = useState(false);

    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const result = await response.json();
        setData(result);
        setShowData(true);
    };

    const hideData = () => {
        setShowData(false);
    };

    return (
        <TestLayout>
            <div>
                <button onClick={fetchData}>Fetch Data</button>
                {showData && (
                    <div>
                        <button onClick={hideData}>Hide Data</button>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                )}
            </div>
        </TestLayout>
    );
}

export default FetchTestPage;
