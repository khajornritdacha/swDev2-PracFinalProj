export default async function getRestaurant(id:string) {
    const respond = await fetch(`http://localhost:5001/api/v1/restaurants/${id}`) 
       if(!respond.ok) {
        throw new Error("Failed to fetch restaurant")
       }    
       return await respond.json()
    }