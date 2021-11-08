var faker = require('faker');

const numberOfBarrels = 30;
const numberOfDays = 1000;
const numberOfSlaves = 8;

start(numberOfBarrels, numberOfDays, numberOfSlaves);

function start(numberOfBarrels, numberOfDays, numberOfSlaves) {
    const barrels = [...new Array(numberOfBarrels)].map(() => createBarrel());
    const slaves = [...new Array(numberOfSlaves)].map(() => createSlave());
    const infectedBarrel = poisonBarrel(barrels);
    console.log(slaves);
    console.log(infectedBarrel);

};

function createBarrel() {
    return { isInfected: false, id: faker.datatype.uuid() };
}

function createSlave() {
    return faker.name.findName();
}

function poisonBarrel(barrels) {
    infectedBarrelIndex = getRandomInt(0, barrels.length)
    barrels[infectedBarrelIndex].isInfected = true;
    return barrels[infectedBarrelIndex];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
