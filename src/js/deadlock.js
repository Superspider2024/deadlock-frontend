const master = document.getElementById('master');
if(master){
    console.log('IM here', master)
}else{
    console.log('please end me')
}

const lop=(total)=>{
    try{
    let lol=[];
    let ran=0;
    while(lol.length<total){
        ran = Math.floor((Math.random()*total))+1
        if(!lol.includes(ran)){
            lol.push(ran)
    }
    }
    return lol
}catch(e){
    throw new Error('Issue in generating sequnece')
}
}

const poop=async(id)=>{
    const url=`http://localhost:3000/api/images/${id}`

    const response = await fetch(url, {
        method:'GET'
    })

    if(!response){
        throw new Error("server not responding for image requests")
    }

    const data = await response.json()

    return data
}

const hehe= async(player)=>{
    try{
    const card = document.createElement('div');
    card.classList.add('flex', 'flex-col', 'items-center', 'bg-card-bg', 'rounded-lg', 'shadow-lg', 'w-80', 'hover:bg-card-hover', 'transition-all', 'duration-300');
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('w-80', 'h-80');
    const image = document.createElement('img');
    image.src = await poop(player.id);
    image.alt = player.insta;
    image.classList.add('w-full', 'h-full', 'object-cover', 'rounded-t-lg', 'hover:shadow-2xl', 'transition-all', 'duration-300');
    imageContainer.appendChild(image);
    
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('bg-gray-700', 'p-4', 'rounded-b-lg', 'w-full', 'text-center');
    
    const name = document.createElement('p');
    name.classList.add('text-white', 'text-xl', 'font-bold');
    name.textContent = player.insta;
    
    const points = document.createElement('p');
    points.classList.add('text-gray-400');
    points.textContent = `Points: ${player.votes}`;
    
    const rank = document.createElement('p');
    rank.classList.add('text-gray-400');
    rank.textContent = `Rank: ${lastk(player.insta)}`;
    
    detailsContainer.appendChild(name);
    detailsContainer.appendChild(points);
    detailsContainer.appendChild(rank);
    
    card.appendChild(imageContainer);
    card.appendChild(detailsContainer);

    master.appendChild(card)

    }catch(e){
        throw e;
    }
}

const lastk=async(player1)=>{
    const url=`http://localhost:3000/app/leaderboards/${player1}`

    const response = await fetch(url, {
        method:'GET',
    })

    if(!response.ok){
        throw new Error("Issue getting the ranks")
    }

    const data = await response.json()

    return data.rank;
}

const lup= async()=>{
    try{
    let bruv = JSON.parse(localStorage.getItem('sequence'))
    console.log(bruv)
    const url='http://localhost:3000/'

    const response= await fetch(url,{
        method:'GET'
    })

    if(!response){
        alert("Server not responding")
    }

    const data = await response.json()
    for(let i=0;i<=1;i++){
        const main = data.find(e=> e.id===bruv[i])
        console.log(main)
        await hehe(main)
        const lol=bruv.splice(i,1)
        localStorage.setItem('sequence',JSON.stringify(lol))

    }
    }catch(e){
        console.log(e.message)
        
    }
}

const main1= async()=>{
        if(localStorage.getItem("sequence")){
            try{
                const url = 'http://localhost:3000/'
            
                const response = await fetch(url,{
                    method:'GET',
                })
            
                if(!response.ok){
                    alert("Issue loading content, this is a server error")
                    return
                }
                const data= await response.json();
            
                const total = Number(data.length);
                localStorage.setItem("sequence", JSON.stringify(lop(total)))
                await lup()
                return
                
            
            
                }catch(e){
                    console.log(e.message)
                    return
                }
        }else{
            console.log('Images stored in localStorage in previous session')
            await lup()
            return
        }
    
    }
    


const main=async()=>{
    await main1()
}

document.addEventListener('DOMContentLoaded',main)

