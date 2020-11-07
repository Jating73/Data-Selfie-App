async function Get()
{
    const logs=document.getElementById('picLogs')
    const response=await fetch('/api')
    const json=await response.json()
    
    for(data of json)
    {
        const card=document.createElement('div')
        const cardBody=document.createElement('div')
        const lat=document.createElement('p')
        const long=document.createElement('p')
        const date=document.createElement('p')
        const time=document.createElement('p')
        const mood=document.createElement('p')
        const image=document.createElement('img')

        image.classList.add('card-img-top')
        image.alt="Data"
        card.classList.add('card')
        cardBody.classList.add('card-body')

        card.style.width="18rem"
        card.style.margin="5px auto"
        const dateString=new Date(data.timestamp).toLocaleTimeString()
        const timeString=new Date(data.timestamp).toLocaleDateString()
        lat.textContent=`Latitude:${data.lat}`
        long.textContent=`Latitude:${data.long}`
        date.textContent=`Date:${dateString}`
        time.textContent=`Time:${timeString}`
        mood.textContent=`Mood:${data.mood}`
        image.src=data.image64
        
        cardBody.append(lat,long,date,time,mood)
        card.append(image,cardBody)
        logs.append(card)
    }
}
Get()