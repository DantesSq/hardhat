import { SimpleStorage, SimpleStorage__factory } from '../typechain-types';
import {ethers} from "hardhat"
import {expect, assert} from "chai"
import { BaseContract } from "ethers"

describe("SimpleStorage", ()=>{
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    beforeEach(async ()=>{
        simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as unknown as SimpleStorage__factory
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