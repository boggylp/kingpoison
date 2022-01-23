const faker = require('faker');

const numberOfBarrels = 1000;
const numberOfDays = 30;
const numberOfSlaves = 10;

start(numberOfBarrels, numberOfDays, numberOfSlaves);

function start(numberOfBarrels, numberOfDays, numberOfSlaves) {
    const barrels = [...new Array(numberOfBarrels)].map(() => createBarrel());
    const slaves = [...new Array(numberOfSlaves)].map(() => createSlave());
    const infectedBarrel = poisonRandomBarrel(barrels);
    console.log("Starting slaves: ", slaves);
    console.log("Infected barrel: ", infectedBarrel);

    saveTheKing(barrels, slaves, numberOfDays);
};

function saveTheKing(barrels, slaves, numberOfDays) {

    const untastedBarrels = [...barrels];

    for (let i = 0; i < slaves.length; i++) {
        sacrificeSlave(slaves[i], untastedBarrels);
        i++;
    }

    console.log(slaves);
    const deadSlaves = slaves.filter(s => s.tastedBarrels.find(b => b.isPoisoned));
    deadSlaves.forEach(slave => slave.isAlive = false);

    console.log("Remaining slaves: ", slaves.filter(s => s.isAlive));
    console.log("RIP slaves: ", deadSlaves);

    if (true) {
        console.log("The king is dead. Long live the king!");
    } else {
        console.log("The king survived!");
    }
}

function sacrificeSlave(slave, barrels) {
    // taste barrels
    const splitLength = Math.floor(barrels.length / 2);
    for (let j = 0; j < barrels.length; j += splitLength) {
        slave.tastedBarrels = barrels.splice(j, splitLength);
    }
}

function createBarrel() {
    return { isPoisoned: false, id: faker.datatype.uuid() };
}

function createSlave() {
    return { name: faker.name.findName(), isAlive: true, tastedBarrels: [] };
}

function poisonRandomBarrel(barrels) {
    infectedBarrelIndex = getRandomInt(0, barrels.length)
    barrels[infectedBarrelIndex].isPoisoned = true;
    return barrels[infectedBarrelIndex];
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
