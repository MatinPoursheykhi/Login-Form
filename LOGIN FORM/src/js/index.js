let _img = document.getElementById('image')

_img.addEventListener('mousemove',function(e){
    _halfWidth = (this.clientWidth)/2
    _halfHeight = (this.clientHeight)/2
    
    _clientx = e.clientX
    _clienty = e.clientY
    x = ( (e.clientX) - (this.offsetLeft)) - _halfWidth
    y = ( (e.clientY) - (this.offsetTop)) - _halfHeight
    this.style.transform = `perspective(1200px)rotateY(${x/8}deg)rotateX(${y/8}deg)`
})

async function users(){
    const response = await fetch('src/jsonAPI/data.json')
    // if(!response.ok){
    //     // alert('badbakht shodim')
    // }else{
    //     // alert('barikalla')
    // }

    let data = await response.json()
    return data
}

let flag
users().then(data => {

    document.getElementById('login').addEventListener('click',function(){
        _emailVal = this.previousElementSibling.previousElementSibling.children[1]
        _passwordVal = this.previousElementSibling.children[1]

        for(i=0; i<data.results.length; i++){
            if(_emailVal.value == data.results[i].email){
                flag = i
            }
        }
        _emailJson = data.results[flag].email
        _passwordJson = data.results[flag].login.password
        
        if( _emailVal.value == _emailJson && _passwordVal.value == _passwordJson){
            userInformations(data , flag)
            document.getElementById('loginSec').style.display = 'none'
            document.getElementById('infoSec').style.display = 'flex'
        }else{
            alert('Your EMAIL or PASSWORD is Wrong')
        }
        document.getElementById('backToLogin').addEventListener('click',function(){
            if(document.getElementById('infoSec').style.display = 'flex'){
                document.getElementById('infoSec').style.display = 'none'
                document.getElementById('loginSec').style.display = 'flex'

                _emailVal.value = null 
                _passwordVal.value = null
            }
        })
        
        
    })  
})

function userInformations(data , num){
    document.getElementById('userProf').setAttribute('src' , `${data.results[num].picture.large}`) 
    document.getElementById('userName').innerHTML = `${data.results[num].name.first} ${data.results[num].name.last}`
    document.getElementById('userEmail').innerHTML = `${data.results[num].email}`
    document.getElementById('userGender').innerHTML = `${data.results[num].gender}`
    document.getElementById('userLocation').innerHTML = `${data.results[num].location.country}, ${data.results[num].location.state}, ${data.results[num].location.city}`
    document.getElementById('userPhone').innerHTML = `${data.results[num].phone}`
    document.getElementById('userUsername').innerHTML = `${data.results[num].login.username}`
    document.getElementById('userPassword').innerHTML = `${data.results[num].login.password}`
}

