import { Client, Account, ID } from 'react-native-appwrite';

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

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}

