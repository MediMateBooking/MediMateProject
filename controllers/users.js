import { v4 as uuidv4 } from 'uuid';

let users = [];  // Define the users array 


export const getUser = (req, res) => {
    res.send(users);  // Return the current list of users
}


export const createUser = (req, res) => {
    const user = { ...req.body, id: uuidv4() };  // Create a new user object with a unique ID
    users.push(user);  // Add the new user to the users array
    res.send(`User with the name ${req.body.firstName} added to the database!`);
}


export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id);  // Filter the user with the ID
    res.send(`User with the id ${id} deleted from the database!`);
}


export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const user = users.find((user) => user.id === id);  // Find the user by ID

    if (user) {
        if (firstName) user.firstName = firstName;  // Update first name if provided
        if (lastName) user.lastName = lastName;     // Update last name if provided
        if (age) user.age = age;                    // Update age if provided

        res.send(`User with the id ${id} has been updated`);
        
    } else {
        res.status(404).send(`User with the id ${id} not found`); // Handle case where user is not found
    }
}
