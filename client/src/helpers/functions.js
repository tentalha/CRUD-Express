export const checkForNull = (data) => {
    // const { name, age, interest } = user;
    // if (name && age && interest) return false;
    // return true;

    return Object.values(data).every(item => item !== null)
};
