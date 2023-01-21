import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.local.js";

const STORAGE_KEY = "gig";
_createGigs();
export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  addGigMsg,
  getDefaultFilter,
};
window.cs = gigService;

async function query(filterBy = getDefaultFilter()) {
  var gigs = await storageService.query(STORAGE_KEY);
  console.log(filterBy, "filterBy");
  if (filterBy.title) {
    const regex = new RegExp(filterBy.title, "i");
    gigs = gigs.filter(
      (gig) => regex.test(gig.title) || regex.test(gig.description)
    );
    console.log("gigs", gigs);
  }

  if (filterBy.daysToMake) {
    gigs = gigs.filter((gig) => gig.daysToMake <= filterBy.daysToMake);
    console.log("gigs", gigs);
  }

  if (filterBy.price) {
    gigs = gigs.filter((gig) => gig.price <= filterBy.price);
  }

  return gigs;
}
// function query(filterBy = getDefaultFilter()) {
//   return storageService.query(NOTE_KEY).then((notes) => {
//     if (filterBy.txt) {
//       const regex = new RegExp(filterBy.txt, "i");
//       notes = notes.filter((note) => regex.test(note.info.title));
//     }
//     if (filterBy.type) {
//       const regex = new RegExp(filterBy.type, "i");
//       notes = notes.filter((note) => regex.test(note.type));
//     }
//     return notes;
//   });
// }
function _createGigs() {
  let gigs = utilService.loadFromStorage(STORAGE_KEY);
  if (!gigs || !gigs.length) {
    gigs = require("../data/gigs.json");
    console.log("gigs", gigs);
    gigs = gigs.map((gig) => {
      gig.createdAt =
        Date.now() -
        utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24 * 7);
      // gig._id = utilService.makeId()
      return gig;
    });
    utilService.saveToStorage(STORAGE_KEY, gigs);
  }
  // return gigs
}

async function getById(gigId) {
  try {
    let gig = await storageService.get(STORAGE_KEY, gigId);
    try {
      const user = await userService.getById(gig.owner._id);
      gig.reviews = user.reviews;
    } catch (err) {
      console.log("cant get user", err);
      gig.reviews = [];
    }
    return gig;
  } catch (err) {
    console.log("cant get gig", err);
    throw err;
  }
}

async function remove(gigId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, gigId);
}

async function save(gig) {
  var savedGig;
  if (gig._id) {
    savedGig = await storageService.put(STORAGE_KEY, gig);
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser();
    savedGig = await storageService.post(STORAGE_KEY, gig);
  }
  return savedGig;
}

async function addGigMsg(gigId, txt) {
  // Later, this is all done by the backend
  const gig = await getById(gigId);
  if (!gig.msgs) gig.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  gig.msgs.push(msg);
  await storageService.put(STORAGE_KEY, gig);

  return msg;
}

function getEmptyGig() {
  return {
    vendor: "Susita-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  };
}

function getDefaultFilter() {
  return {
    title: "",
    maxPrice: Infinity,
    tags: "All",
    daysToMake: 0,
  };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))
