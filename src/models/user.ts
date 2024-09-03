export type User = {
    _id: string;
    _createdAt: string;
    name: string;
    email: string;
    image: string;
    about: string | null;
    isAdmin: boolean;
};
