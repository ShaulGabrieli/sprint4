// import { storageService } from './async-storage.service.js'
import { httpService } from "./http.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";

const STORAGE_KEY = "gig";

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
  addGigMsg,
  getDefaultFilter,
  getFilterFromSearchParams,
};
window.cs = gigService;

async function query(filterBy = getDefaultFilter()) {
  return httpService.get('gig');
}

async function getById(gigId) {
  try {
    const gig = await httpService.get(`gig/${gigId}`)
    console.log('gig', gig)
    return gig
  }
  catch (err) {
    console.log('cant load gig', err);
    throw err
  }
 
  // return storageService.get(STORAGE_KEY, gigId)
  
}

async function remove(gigId) {
  // await storageService.remove(STORAGE_KEY, gigId)
  return httpService.delete(`gig/${gigId}`);
}
async function save(gig) {
  var savedGig;
  if (gig._id) {
    // savedGig = await storageService.put(STORAGE_KEY, gig)
    savedGig = await httpService.put(`gig/${gig._id}`, gig);
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser();
    // savedGig = await storageService.post(STORAGE_KEY, gig)
    savedGig = await httpService.post("gig", gig);
  }
  return savedGig;
}

async function addGigMsg(gigId, txt) {
  const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt });
  return savedMsg;
}

function getEmptyGig() {
  return {
    "title": "",
    "price": 0,
    "owner": {
      "_id": "",
      "fullname": "",
      "imgUrl": "",
      "level": "basic",
      "rate": 1
    },
    "daysToMake": 1,
    "description": "",
    "imgUrls": [],
    "tags": [
    ],
    "likedByUsers": [
    ],
    "totalLikes": 0
  }

}
function getDefaultFilter() {
  return {
    title: "",
    maxPrice: Infinity,
    tags: "All",
    daysToMake: 0,
  };
}

function getFilterFromSearchParams(searchParams) {
  const emptyFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in emptyFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}


