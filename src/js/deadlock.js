const master = document.getElementById('master');
const blahblah=async(player)=>{
    const username=String(player);
    await navigator.clipboard.writeText(username)

}

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

const hehe= async(player,i)=>{
    try{
        const card = document.createElement('div');
        card.id=i
        card.classList.add('flex', 'flex-col', 'items-center', 'bg-card-bg', 'rounded-lg', 'shadow-lg', 'w-80', 'hover:bg-card-hover', 'transition-all', 'duration-300');
        
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('w-80', 'h-80');
        const image = document.createElement('img');
        image.id=`image${i}`
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
        rank.textContent = `Rank: ${await lastk(player.insta)}`;
        
        detailsContainer.appendChild(name);
        detailsContainer.appendChild(points);
        detailsContainer.appendChild(rank);
        
        card.appendChild(imageContainer);
        card.appendChild(detailsContainer);

    
        master.appendChild(card)

    card.addEventListener('click', async () => {
        const winner = i === 0 ? 'image0' : 'image1';
        const loser = i === 0 ? 'image1' : 'image0';

        const winAlt = document.getElementById(winner).alt;
        const loseAlt = document.getElementById(loser).alt;

        const url = `http://localhost:3000/api/vote`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                win: winAlt,
                loss: loseAlt,
            }),
        });
        const data = await response.json()
        if (response.status === 201) {
            master.innerHTML='';
            await main1()
            return;
        }else{
            throw new Error("Errro sending votes", response.status, data)
        }})

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
    const yo = String(data.rank)

    return yo;
}

const lup= async()=>{
    try{
    let bruv = JSON.parse(localStorage.getItem('sequence'))
    console.log(bruv)
    const url=`http://localhost:3000/`
    const response = await fetch(url,{
        method:'GET'
    })
    const data= await response.json();
    for(let i=0;i<=1;i++){
        const main2 = data.find(e=> e.id===bruv[i])
        console.log(main2)
        await hehe(main2,i)
        let lol=await bruv.splice(i,1)
        localStorage.setItem('sequence',JSON.stringify(lol))
        console.log(bruv)

    }
    }catch(e){
        console.log(e.message)
        
    }
}

const main1= async()=>{
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
    }
    


const main=async()=>{
    await main1();
}

document.addEventListener('DOMContentLoaded',main)
