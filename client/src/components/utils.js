export const getFriends = (friendsData) => {
    return friendsData.map((friend) => ({
        label: friend.username,
        value: friend._id,
    }));
};