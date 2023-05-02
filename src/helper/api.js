export default async function api(date){

    //date format = YYYY-MM-DD

    //Goals: velocity from RL

    const url = process.env.REACT_APP_API_URL;
    const key = process.env.REACT_APP_API_KEY;
    
    //start_date={today}&end_date={today}&api_key=

    const response = await fetch(`${url}start_date=${date}&end_date=${date}&api_key=${key}`);
    const data = await response.json();
    const fetchedAsteroids = await data.near_earth_objects;


    const asteroidData =[] 

    Object.keys(fetchedAsteroids).forEach(key => {


        // console.log(key, fetchedAsteroids[key]);
        fetchedAsteroids[key].forEach(asteroid => {

            let averageDia = Math.floor((asteroid.estimated_diameter.meters.estimated_diameter_min + asteroid.estimated_diameter.meters.estimated_diameter_max)/4)
            

            asteroidData.push({
                name: asteroid.name,
                dia: averageDia,
                velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
            });

        });
    });

    return asteroidData;

}