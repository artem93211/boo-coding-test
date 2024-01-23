import { profileAvatar, profileTemplate, demoProfile } from "../constants.js";
import {
    createProfile,
    getAllProfiles,
    getProfileById,
} from "../database/profile.db.js";

async function createProfileHandler(req, res) {
    const {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
    } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const profile = {
            name,
            description: description || demoProfile.description,
            mbti: mbti || demoProfile.mbti,
            enneagram: enneagram || demoProfile.enneagram,
            variant: variant || demoProfile.variant,
            tritype: tritype || demoProfile.tritype,
            socionics: socionics || demoProfile.socionics,
            sloan: sloan || demoProfile.sloan,
            psyche: psyche || demoProfile.psyche,
            image: profileAvatar,
        };
        const createdProfile = await createProfile(profile);
        return res.status(201).json({
            message: "New Profile created successfully",
            profileId: createdProfile,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function getAllProfilesHandler(req, res) {
    try {
        const profiles = await getAllProfiles();
        return res.json(profiles);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

async function getProfileHandler(req, res) {
    try {
        const profile = await getProfileById(req.params.id);
        if (!profile) {
            return res
                .status(404)
                .json({ message: `Profile for Id ${req.params.id} not found` });
        }
        res.render(profileTemplate, { profile });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export { createProfileHandler, getAllProfilesHandler, getProfileHandler };
