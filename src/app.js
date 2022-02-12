const faker = require('faker');

const numberOfBarrels = 1000;
const numberOfDays = 30;
const numberOfSlaves = 10;

start(numberOfBarrels, numberOfDays, numberOfSlaves);

function start(numberOfBarrels, numberOfDays, numberOfSlaves) {
    const barrels = [...new Array(numberOfBarrels)].map(() => createBarrel());
    const slaves = [...new Array(numberOfSlaves)].map(() => createSlave());

    console.log("Starting slaves: ", slaves);

    saveTheKing(barrels, slaves, numberOfDays);
};

// Key outline: for each slave dead and alive combination you can note one barrel
// meaning (2^n)-1 barrels can be determined where n is number of slaves
// another key thought: O(logn) slaves can be sacrificed
function saveTheKing(barrels, slaves, numberOfDays) {

    const poisonedBarrelIndex = poisonRandomBarrel(barrels);
    const poisonedBarrel = barrels[poisonedBarrelIndex];

    console.log("Infected barrel", poisonedBarrel);
    console.log("Poisoned barrel index", poisonedBarrelIndex);
    console.log("Binary poisoned barrel", dec2bin(poisonedBarrelIndex, slaves.length));

    // decide which slave drinks which barrels
    for (let i = 0; i < barrels.length; i++) {
        const binaryBarrel = dec2bin(i, slaves.length);
        for (let slaveIndex = 0; slaveIndex < slaves.length; slaveIndex++) {
            if (binaryBarrel[slaveIndex] == 0) {
                slaves[slaveIndex].tastedBarrels.push(barrels[i]);
            }
        }
    };

    // kill unlucky slaves
    const deadSlaves = slaves.filter(s => s.tastedBarrels.find(b => b.isPoisoned));
    deadSlaves.forEach(slave => slave.isAlive = false);

    const poisonedBarrelFromSlaves = findPoisonedBarrel(slaves, barrels);

    console.log("Remaining slaves: ", slaves.filter(s => s.isAlive).map(s => s.name));
    console.log("RIP slaves: ", deadSlaves.map(s => s.name));
    console.log("King has decided that poisoned barrel is: ", poisonedBarrelFromSlaves);

    if (poisonedBarrelFromSlaves.id == poisonedBarrel.id) {
        console.log("The king survived!");
    } else {
        console.log("The king is dead. Long live the king!");
    }
}

function findPoisonedBarrel(slaves, barrels) {
    let binaryNumber = "";
    for (let i = 0; i < slaves.length; i++) {
        if (slaves[i].isAlive) {
            binaryNumber += 1;
        } else {
            binaryNumber += 0;
        }
    }

    let poisonedBarrelIndex = parseInt(binaryNumber, 2);
    console.log("Binary found barrel", binaryNumber);
    console.log("Found poisoned barrel index", poisonedBarrelIndex)
    return barrels[poisonedBarrelIndex];
}

function createBarrel() {
    return { isPoisoned: false, id: faker.datatype.uuid() };
}

function createSlave() {
    return { name: faker.name.findName(), isAlive: true, tastedBarrels: [] };
}

function poisonRandomBarrel(barrels) {
    poisonedBarrelIndex = getRandomInt(0, barrels.length)
    barrels[poisonedBarrelIndex].isPoisoned = true;
    return poisonedBarrelIndex;
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function dec2bin(dec, minDecimalsCount = 0) {
    let binaryNumber = (dec >>> 0).toString(2);
    if (binaryNumber.length < minDecimalsCount) {
        const leadingZeros = "0".repeat(minDecimalsCount - binaryNumber.length);
        binaryNumber = leadingZeros + binaryNumber;
    }

    return binaryNumber;
}

function log(base, number) {
    return Math.log(number) / Math.log(base);
}

function reverse(s) {
    return s.split("").reverse().join("");
}