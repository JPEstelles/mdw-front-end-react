import React from "react";

const Admin: React.FC = () => {
    return (
        <div>
            <h1>Admin Page</h1>
            <p>This is a protected route accessible only to authenticated users as Admin.</p>
        </div>
    );
}

export default Admin;
