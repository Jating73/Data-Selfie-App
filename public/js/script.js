function setup(){
    const canvasid=document.getElementById('canvasContainer')
    noCanvas()
    const video = createCapture(VIDEO)
    video.parent(canvasid);
    video.size(340,280)

    let lat,long;
    const btn=document.getElementById('submit')
        if('geolocation' in navigator) {
            const latitude= document.getElementById('lat')
            const longitude= document.getElementById('long')
            console.log('Geolocation is available')
            navigator.geolocation.getCurrentPosition(async(position) => {
                lat=position.coords.latitude.toFixed(2)
                long=position.coords.longitude.toFixed(2)
                latitude.textContent=lat
                longitude.textContent=long
            });
        } else {
            console.log('Geolocation is NOT available')
        }
        
        async function Submit()
        {
            const moodVal=document.getElementById('mood')
            if(moodVal.value=='')
            {
                moodVal.value="Nothing!"
            }
            const alertSuccess=document.getElementById('alert')
            const mood=moodVal.value
            video.loadPixels()
            const image64=video.canvas.toDataURL()
            const data={lat,long,image64,mood}
            const options ={
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }
                const response=await fetch('/api',options)
                const json=await response.json()
                alertSuccess.style.display="block"
            setTimeout(()=>{
                alertSuccess.style.display="none"
            },1000)        
        }
        btn.addEventListener('click',Submit)
}

