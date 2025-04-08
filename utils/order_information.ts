import { faker } from "@faker-js/faker";

export let name: string;
export let country: string;
export let city: string;
export let creditCard: string;
export let month: string;
export let year: string;

name = faker.person.fullName();
country = faker.location.country();
city = faker.location.city();
creditCard = faker.finance.creditCardNumber();
month = faker.date.month();
year = faker.number.int({ min: 2025, max: 2035 }).toString();