const main = document.getElementById('main');
const search = document.getElementById('search');
const inputsend1 = document.getElementById('inputsend1')
const bro = async(player,pop)=>{
    try{
        const account = document.createElement('div');
        account.classList.add('flex', 'flex-wrap', 'justify-between', 'text-lg', 'text-nice-grey', 'py-2', 'border-b', 'border-gray-600');
    
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('w-full', 'sm:w-1/4', 'flex', 'justify-center', 'items-center', 'mb-4', 'sm:mb-0'); // Added mobile responsive width and margin
        const playerImage = document.createElement('img');
        playerImage.src = await lmao(player);  
        playerImage.alt = player.insta;  
        playerImage.classList.add('w-20', 'h-20', 'object-cover', 'rounded-full');
        imageContainer.appendChild(playerImage);
    
        const nameContainer = document.createElement('div');
        nameContainer.classList.add('w-full', 'sm:w-1/4', 'text-center', 'sm:mr-2', 'mb-4', 'sm:mb-0'); // Added mobile responsive width and margin
        nameContainer.textContent = player.insta;
    
        const votes = document.createElement('div');
        votes.classList.add('w-full', 'sm:w-1/4', 'text-center', 'sm:ml-18', 'mb-4', 'sm:mb-0'); // Added mobile responsive width and margin
        votes.textContent = player.votes;
    
        const rankContainer = document.createElement('div');
        rankContainer.classList.add('w-full', 'sm:w-1/4', 'text-center', 'mb-4', 'sm:mb-0');
        rankContainer.textContent = pop + 1;
    
        account.appendChild(imageContainer);
        account.appendChild(nameContainer);
        account.appendChild(votes);
        account.appendChild(rankContainer);
    
        main.appendChild(account);
    } catch (e) {
        console.log(e.message);
    }
}

const lmao = async(blah)=>{
    try{
    const url=`https://deadlock-backend-production.up.railway.app/api/images/${blah.id}`

    const response = await fetch(url,{
        method:'GET'
    })
    const data1 = await response.json()
    const data2=data1.replace(/[\n]+/g, '');
    return data2
    }catch(e){
        throw new Error('Issue with the images api')
    }
}


document.addEventListener('DOMContentLoaded', async ()=>{
    try{

    const url = 'https://deadlock-backend-production.up.railway.app/app/leaderboards'

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
    const url=`https://deadlock-backend-production.up.railway.app/app/leaderboards/${player1}`

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

