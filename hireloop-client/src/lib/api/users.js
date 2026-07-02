'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const getUsersList = async () => {
    try {
        const users = await auth.api.listUsers({
            query: {
                sortBy: "createdAt",
                sortDirection: "desc"
            },
            headers: await headers(),
        });
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};

export const updateUserRole = async (userId, role) => {
    try {
        const data = await auth.api.setRole({
            body: {
                userId: userId,
                role: role
            },
            headers: await headers()
        });

        revalidatePath('/dashboard/admin/users');
        return data;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role");
    }
};

export const deleteUser = async (userId) => {
    try {
        const data = await auth.api.deleteUser({
            body: {
                userId: userId
            },
            headers: await headers()
        });

        revalidatePath('/dashboard/admin/users');
        return data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
};