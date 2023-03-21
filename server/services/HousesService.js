import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class HousesService {
  
  async getHouses(query) {
    const houses = await dbContext.Houses.find(query)
    return houses
  }

  async getHouseById(houseId) {
    const house = await dbContext.Houses.findById(houseId)
    if (!house) {
      throw new BadRequest('Invalid house id')
    }
    return house
  }

  async createHouse(houseData) {
    const newHouse = await dbContext.Houses.create(houseData)
    return newHouse
    }

    async editHouse(houseEdits, houseId) {
    const originalHouse = await this.getHouseById(houseId)
    originalHouse.bedrooms = houseEdits.bedrooms ? houseEdits.bedrooms : originalHouse.bedrooms
    originalHouse.bathrooms = houseEdits.bathrooms ? houseEdits.bathrooms : originalHouse.bathrooms
    originalHouse.year = houseEdits.year ? houseEdits.year : originalHouse.year
    originalHouse.price = houseEdits.price ? houseEdits.price : originalHouse.price
    originalHouse.price = houseEdits.price ? houseEdits.price : originalHouse.price
    originalHouse.imgUrl = houseEdits.imgUrl ? houseEdits.imgUrl : originalHouse.imgUrl
    originalHouse.description = houseEdits.description ? houseEdits.description : originalHouse.description
    await originalHouse.save()
    return originalHouse
  }

    async deleteHouse(houseId) {
    await dbContext.Houses.findByIdAndDelete(houseId)
    return
  }
}

export const housesService = new HousesService()