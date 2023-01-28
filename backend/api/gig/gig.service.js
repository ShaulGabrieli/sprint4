const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log('filterByfilterBy', filterBy);
    try {
        const criteria = _buildCriteria(filterBy)
        console.log('criteria', criteria);
        const collection = await dbService.getCollection('gigs')
        var gigs = await collection.find(criteria).toArray()
        return gigs
    } catch (err) {
        logger.error('cannot find gigs', err)
        throw err
    }
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('gigs')
        const gig = collection.findOne({ _id: ObjectId(gigId) })
        return gig
    } catch (err) {
        logger.error(`while finding gig ${gigId}`, err)
        throw err
    }
}

async function remove(gigId) {
    try {
        const collection = await dbService.getCollection('gigs')
        await collection.deleteOne({ _id: ObjectId(gigId) })
        return gigId
    } catch (err) {
        logger.error(`cannot remove gig ${gigId}`, err)
        throw err
    }
}

async function add(gig) {
    try {
        const { loggedinUser } = asyncLocalStorage.getStore()
        gig.owner = loggedinUser
        const collection = await dbService.getCollection('gigs')
        await collection.insertOne(gig)
        return gig
    } catch (err) {
        logger.error('cannot insert gig', err)
        throw err
    }
}

async function update(gig) {
    try {
        const gigToSave = gig
        delete gigToSave._id
        const collection = await dbService.getCollection('gigs')
        await collection.updateOne({ _id: ObjectId(gig._id) }, { $set: gigToSave })
        return gig
    } catch (err) {
        logger.error(`cannot update gig ${gigId}`, err)
        throw err
    }
}

async function addGigMsg(gigId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('gigs')
        await collection.updateOne({ _id: ObjectId(gigId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        logger.error(`cannot add gig msg ${gigId}`, err)
        throw err
    }
}

async function removeGigMsg(gigId, msgId) {
    try {
        const collection = await dbService.getCollection('gigs')
        await collection.updateOne({ _id: ObjectId(gigId) }, { $pull: { msgs: { id: msgId } } })
        return msgId
    } catch (err) {
        logger.error(`cannot add gig msg ${gigId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.title) {
        criteria.title = { $regex: new RegExp(filterBy.title, 'ig') }
    }
   if(filterBy.daysToMake) {
    criteria.daysToMake = {$lte: filterBy.daysToMake}
   }
   if(filterBy.tags) {
    criteria.tags = filterBy.tags
   }
   if(filterBy.maxPrice && filterBy.maxPrice !== Infinity) {
    criteria.maxPrice = {$lte: filterBy.maxPrice}
   }
    return criteria
}

// function getDefaultFilter() {
//     return {
//       title: "",
//       maxPrice: Infinity,
//       tags: "All",
//       daysToMake: 0,
//     };
//   }
module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addGigMsg,
    removeGigMsg
}
