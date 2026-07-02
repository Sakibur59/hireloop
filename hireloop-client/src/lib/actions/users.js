
export const getUsersList = async () => {
    try {
        const response = await fetch('/api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const response = await fetch('/api/admin/users/role', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, role }),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error("Error updating user role:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};