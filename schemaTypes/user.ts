import { defineField } from 'sanity'

const user = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        defineField({
            name: 'isAdmin',
            title: 'Is Admin',
            type: 'boolean',
            description: "",
            initialValue: false,
            validation: Rule => Rule.required(),
            // readOnly: true,
            // hidden: true,
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: "Name of the user",
            readOnly: true,
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'url'
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            description: "Email of the user",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'password',
            type: 'string',
            hidden: true,
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'emailVerified',
            type: 'datetime',
            hidden: true,
        }),
        defineField({
            name: 'about',
            type: 'text',
            title: 'About',
            description: "Brief description of the user",
        }),
    ],
}

export default user;
