const usernameInput = document.getElementById('username_input')
const inputsend = document.getElementById('inputsend')


inputsend.addEventListener('click',()=>{
    const bro = usernameInput.value;

    const lol = async (username1)=>{
        const url = `https://deadlock-backend-production.up.railway.app/app/add/${username1}`;


        try{
        const response = await fetch(url,{
            method:'GET'
        })

        if(!response){
            throw new Error("Issue sending the request")
        }

        const data = await response.json()
        alert(data)
        

        }catch(e){
            alert(e.message)
        }
    }

    lol(bro);
    usernameInput.value='';


})

//Ive been coding for about 7hrs straight, I've reached final poetnetial!!