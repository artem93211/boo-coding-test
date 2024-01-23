const collectionName = {
    profile: "profiles",
    user: "users",
    comment: "comments",
};
const databaseName = "booTest";
const profileAvatar = "https://boo.world/static/blogs/social-media-addiction.webp";
const profileTemplate = "profile_template";

const demoProfile = {
    id: "1",
    name: "Elon Musk",
    description: "Elon Reeve Musk FRS (/ˈiːlɒn/; born June 28, 1971) is a technology entrepreneur, investor, and engineer. He holds South African, Canadian, and U.S. citizenship and is the founder, CEO, and lead designer of SpaceX; co-founder, CEO, and product architect of Tesla, Inc.; co-founder and CEO of Neuralink; founder of The Boring Company; co-founder and co-chairman of OpenAI; and co-founder of PayPal. As of February 2021, Musk's net worth stands at $184 billion, making him the 2nd richest person in the world.",
    mbti: "INTP",
    enneagram: "5w6",
    variant: "so/sp",
    tritype: 513,
    socionics: "ILE",
    sloan: "RCOEI",
    psyche: "VLFE",
    image: profileAvatar,
}

const demoUser = {
    id: "1",
    name: "Elon Musk",
    profileId: "1",
}

const demoComment = {
    id: "1",
    title: "Comment For Elon Musk",
    description: "Test comment",
    vote: {
        mbti: null,
        enneagram: null,
        zodiac: null,
    },
    to: "1",
    likes: 0,
}

export {
    collectionName,
    databaseName,
    profileAvatar,
    profileTemplate,
    demoProfile,
    demoUser,
    demoComment,
}