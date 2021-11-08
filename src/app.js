var faker = require('faker');

const numberOfBarrels = 30;
const numberOfDays = 1000;
const numberOfSlaves = 8;

start(numberOfBarrels, numberOfDays, numberOfSlaves);

function start(numberOfBarrels, numberOfDays, numberOfSlaves) {

    const barrels = new Array(numberOfBarrels).fill({ isInfected: false, id: faker.datatype.uuid() });
    console.log(barrels);
    const slaves = new Array(numberOfSlaves).fill(faker.name.findName());
    console.log(slaves);
    // infected barrel
    const infectedBarrel = poisonBarrel(barrels);
    console.log(infectedBarrel);
};

function poisonBarrel(barrels) {

    infectedBarrelIndex = getRandomInt(0, barrels.length)
    barrels[infectedBarrelIndex] = true;
    return barrels[infectedBarrelIndex];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

