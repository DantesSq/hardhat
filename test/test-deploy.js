import pkg from "hardhat"
const {ethers} = pkg
import {expect, assert} from "chai"

describe("SimpleStorage", ()=>{
    let simpleStorageFactory, simpleStorage
    beforeEach(async ()=>{
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should starts with a favorite number of 0", async ()=>{
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async ()=>{
        const expectedValue = "7"
        const tx = await simpleStorage.store(expectedValue)
        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add person", async ()=>{
        const name = "Andre"
        const favoriteNumber = "9"
        const addPerson = await simpleStorage.addPerson(name, favoriteNumber)
        const addedPerson = await simpleStorage.people(0)

        assert.equal(name, addedPerson.name)
        assert.equal(favoriteNumber, addedPerson.favoriteNumber.toString())
    })

})