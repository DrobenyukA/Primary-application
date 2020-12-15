import React from 'react';

const RemoteButton = React.lazy(() => import('secondaryApp/Button'));

const App = () => {
    return (
        <div className="app-container">
            <h1>Primary app</h1>
            <div className="placeholder">
                Placeholder for federated module
                <React.Suspense fallback="Loading Button">
                    <RemoteButton color="success">Remote</RemoteButton>
                </React.Suspense>
            </div>
        </div>
    );
};

export default App;
