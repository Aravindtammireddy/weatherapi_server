const request = require('../await-request'); 

  exports.weatherfinder =  async (API_KEY,city) => {
   var url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
   let temp1 =  await request({ url: url1, json: true }, function (error, response) { 
    if (error) { 
        console.log('Unable to connect to Forecast API'); 
    } 
    console.log("response", response)
  // return response.body.main.temp;
  } )  
  if(temp1[0].lat == undefined){
    return 'unknown weather';
  }
  console.log(temp1[0].lat , temp1[0].lon);
   var url = `http://api.openweathermap.org/data/2.5/weather?`
            +`lat=${temp1[0].lat}&lon=${temp1[0].lon}&appid=${API_KEY}` ;
           let temp =  await request({ url: url, json: true }, function (error, response) { 
              if (error) { 
                  console.log('Unable to connect to Forecast API'); 
              } 
              console.log(response.body)
             return response.body.weather;
            } )  
            console.log(temp.weather[0].main)
            return temp.weather[0].main; 
        }
        
   
   exports.imagegenerator =  async (weather) => {
            const options = {
              method: 'POST',
              url: 'https://v1.genr.ai/api/circuit-element/generate-image',
              headers: {'Content-Type': 'application/json'},
              body: {
                prompt: `the weather ${weather} `,
                height: 512,
                width: 512,
                model: 'stable-diffusion-2',
                n_images: 1
              },
              json: true
            };
            
          let image =  await request(options, function (error, response, body) {
              if (error) throw new Error(error);
            
              console.log(body);
              return body.output ;
            })
            return image.output
        }
          