window.addEventListener('load', ()=>{
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 
    let vientoVelocidad = document.getElementById('viento-velocidad')  

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion=>{
            console.log(posicion)

            lon=posicion.coords.longitude
            lat=posicion.coords.latitude

            //ubicación actual
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=58067cfe7a50ab4ebdb5bc1f27bdf958`
            console.log(url)

            //ubicación clima por ciudad
           const url2 = `https://api.openweathermap.org/data/2.5/weather?q=Quito&lang=es&units=metric&appid=58067cfe7a50ab4ebdb5bc1f27bdf958`
           console.log(url2)

            fetch(url2).then(response=>{
                return response.json()
            }).then(datos=>{
                console.log(datos)
                let temp = Math.round(datos.main.temp) // aqui redondeo el valor de la temperatura y lo redondeo
                temperaturaValor.textContent = `${temp} ° C`// aqui ya muestro en la interfaz el valor de la temperatura

                console.log(datos.weather[0].description)
                let tempDescripcion=datos.weather[0].description // aqui obtnego el valor de la descripcion de la temperatura
                temperaturaDescripcion.textContent= tempDescripcion.toUpperCase()
                
                console.log(datos.name)
                let lugar=datos.name // aqui tengo el nombre de la ciudad
                ubicacion.textContent=lugar


                console.log(datos.wind.speed)
                let velocidad=datos.wind.speed // aqui tengo el valor de la velocidad del viento
                vientoVelocidad.textContent = `${velocidad} m/s`


                
                
                //Para iconos dinámicos
                console.log(datos.weather[0].main)
                switch (datos.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

                

            }).catch(error=>{
                console.log(error)
            })

        })
    }
})