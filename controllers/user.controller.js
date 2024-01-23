import { createUser, getAllUsers, getUserById } from "../database/user.db.js";
import { createProfile } from "../database/profile.db.js";
import { demoProfile, demoUser } from "../constants.js";

export async function createUserHandler(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "User Name is required" });
    }
    try {
        const profileData = {
            ...demoProfile,
            name,
        };
        const profileId = await createProfile(profileData);
        const data = {
            ...demoUser,
            name,
            profileId,
        };
        const userId = await createUser(data);
        return res
            .status(201)
            .json({ message: "User created successfully", userId });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getAllUsersHandler(req, res) {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getUserByIdHandler(req, res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: `User with Id ${req.params.id} not found`,
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
