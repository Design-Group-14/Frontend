import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const req = new Request("http://127.0.0.1:8000/api/posts/", {
                    method: "GET",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }),
                });
                const response = await fetch(req)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
            } catch (err) {
                console.log(err.message);
            } finally {
                console.log("request finished");
            }
        };
        fetchPosts()
    }, [])

    return (
        <div>
            <Dashboard />
        </div>
    );
};

export default DashboardPage;
