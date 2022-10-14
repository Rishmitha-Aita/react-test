export const filteredPersons = (persons, target) => {
    return persons.filter(
        person => person.toLowerCase().includes(target.toLowerCase()));
}