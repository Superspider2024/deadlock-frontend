const main = document.getElementById('main');
const search = document.getElementById('search');
const inputsend1 = document.getElementById('inputsend1')

const bro = async(player,pop)=>{
    try{

    const account = document.createElement('div');
    account.classList.add('flex', 'justify-between', 'text-lg', 'text-nice-grey', 'py-2', 'border-b', 'border-gray-600');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('w-1/4', 'flex', 'justify-center', 'items-center');
    const playerImage = document.createElement('img');
    playerImage.src = await lmao(player);  
    playerImage.alt = player.insta;  
    playerImage.classList.add('w-20', 'h-20', 'object-cover', 'rounded-full');
    imageContainer.appendChild(playerImage);

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('w-1/4', 'text-center');
    nameContainer.textContent = player.insta;


    const votes = document.createElement('div');
    votes.classList.add('w-1/4', 'text-center');
    votes.textContent = player.votes;

    const rankContainer = document.createElement('div');
    rankContainer.classList.add('w-1/4', 'text-center');
    rankContainer.textContent =pop+1 ;

    account.appendChild(imageContainer);
    account.appendChild(nameContainer);
    account.appendChild(votes);
    account.appendChild(rankContainer);

    main.appendChild(account);
    }catch(e){
        console.log(e.message)
    }
}

const lmao = async(blah)=>{
    try{
    const url=`http://localhost:3000/api/images/${blah.id}`

    const response = await fetch(url,{
        method:'GET'
    })

    const data1 = await response.json()
    const data2= String(data1)
    return data2
    }catch(e){
        throw new Error('Issue with the images api')
    }
}


document.addEventListener('DOMContentLoaded', async ()=>{
    try{

    const url = 'http://localhost:3000/app/leaderboards'

    const response = await fetch(url,{
        method:'GET',
    })

    if(!response.ok){
        alert("Issue loading content, this is a server error")
    }

    const data= await response.json();

    for(let i=0;i<data.length;i++){
        await bro(data[i],i)
    }

    }catch(e){
        console.log(e.message)
    }
})


inputsend1.addEventListener('click', async()=>{
    try{
    const player1= search.value
    if(player1===''){
        location.reload();

    }
    const url=`http://localhost:3000/app/leaderboards/${player1}`

    const response = await fetch(url, {
        method:'GET',
    })

    if(!response.ok){
        alert('The user cannot be found, you may have mistyped or you can request the user to be added on the home page')
        return
    }

    const data121 = await response.json();
    

    main.innerHTML='';
    await bro(data121.insta,data121.rank);
    }catch(e){
        console.log(e.message)
    }
    
})

