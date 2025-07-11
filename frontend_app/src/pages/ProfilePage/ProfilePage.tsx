import {Profile} from "../../features/profile/components/Profile.tsx";
import {useEffect} from "react";
import {getProfileByIdAPI} from "../../features/profile/api/profileAPI.client.ts";

export const ProfilePage = () => {

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfileByIdAPI(9);
                console.log(response);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        fetchProfile();
    }, []);

    return (
        <Profile/>
    );
};