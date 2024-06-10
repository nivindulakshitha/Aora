import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwrite = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    project: "662cc6ca003742d725f9",
    databaseId: "662cc8c8000799425fbe",
    usersCollection: "662cc8ff001f434a31a1",
    videosCollection: "662cc921001ab7ecc0c0",
    storageId: "662ccb840039da9c5659",
};

const client = new Client();

client
    .setEndpoint(appwrite.endpoint)
    .setProject(appwrite.project)
    .setPlatform(appwrite.platform)

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        console.log(newAccount);

        if (newAccount) {
            const avatarUrl = await avatar.getInitials(newAccount.$id);
            console.log(avatarUrl);
            await signIn(email, password);
            const newUser = databases.createDocument(
                appwrite.databaseId,
                appwrite.usersCollection,
                {
                    $id: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl,
                    videos: [],
                }
            );
            console.log(newUser)
            return newUser;
        } else {
            throw new Error("Account creation failed");
        }
    } catch (error) {
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        await account.deleteSessions();
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        
        if (user) {
            const currentUser = databases.getDocument(
                appwrite.databaseId,
                appwrite.usersCollection,
                [Query.equal("userId", '66674a44a7d3d96dc499')]
            );

            if (currentUser) {
                console.log(currentUser);
                return currentUser.documents[0];
            } else {
                throw new Error("User not found");
            }
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw new Error(error);
    }
};