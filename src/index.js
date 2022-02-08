import './less/index.less'

// Your code goes here!
/*

Event Listeners: 
            //contact is on the bottom because I did not want to place it in the center fixed etc etc, just know that I could if I wanted to!
    [X] Contact onpress -> open the contact modal
    [X] Contact input   -> change an emoji on the modal 
    [X] Contact submit  -> close the modal once the user submits...
    [X] Contact select -> copy selected data from text area to clipboard
    [X] keydown -> when the user presses escape, remove all active modals
    [X] img mouseEnter -> clear img blur
    [X] img mouseLeave -> when the user leaves the img, apply blur to the non focused imgs
    [X] scroll -> when the user scolls, gradientlly go through colors for the background color
    [X] img dbclick -> when the user double clicks a location img, redirect the user to a random google map location
    [X] MutationObserver -> whenever the dom is manipulated alert it to the user
        makes this site actually the worst site in existance!
    

*/
let modalText = '<section id="added-modal" class="added-modal review"> <div class="title"> <h1>Contact Forum</h1> </div> <div class="user-interface"> <div class="forum"> <input type="text" placeholder="email" id="userEmail"> <textarea name="userTextData" id="user-text-data" cols="30" rows="5"></textarea> </div> <div class="buttons"> <form action=""> <input type="radio" name="toggle" id="review" value="review" class="active" checked> <label for="" class="active">review</label> <br><br> <input type="radio" name="toggle" id="complaint" value="complaint" class="inactive"> <label for="" class="inactive">complaint</label> </form> </div> </div> <div class="sub"> <input type="submit" name="" id="added-modal-submit"> </div> </section>'; 
let navButtons = document.querySelectorAll('nav a'); 
let locationImages = document.querySelectorAll('img'); 
let contactLink = navButtons[3]; 

const config = {  
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
}; 
const toggleModalBackground = (event) =>{
    let modal = document.querySelector('#added-modal'); 
    modal.classList.remove(modal.classList[modal.classList.length-1])
    modal.classList.add(event.target.id) 
}

const copyToClip = (event)=>{
    const selection = event.target.value.substring(event.target.selectionStart, event.target.selectionEnd);
    navigator.clipboard.writeText(selection).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}

const openModel = () =>{
    console.log('the button was clicked'); 
    let modal = document.querySelector('#added-modal'); 
    if(modal){
        console.log('the modal exists'); 
        modal.setAttribute('display:flex'); 
    }else{
        console.log('the modal does not exist creating now'); 
        modal = document.createElement('section')
        modal.innerHTML = modalText; 
    }
    document.querySelector('#container').appendChild(modal); 
    let review = document.querySelector("#review"); 
    let complaint = document.querySelector('#complaint'); 
    let submit = document.querySelector('#added-modal-submit'); 
    let textArea = document.querySelector('#user-text-data');
    review.addEventListener('input',()=>toggleModalBackground(event)); 
    complaint.addEventListener('input',()=>toggleModalBackground(event));
    submit.addEventListener('click',()=>removeModal({key:'Escape'})) 
    textArea.addEventListener('select', ()=>copyToClip(event))
}

const removeModal = (event) =>{
    if(event.key == 'Escape'){
        let modal = document.querySelector('#added-modal'); 
        modal.remove(); 
    }
}

const focus = (event) => {
    event.target.setAttribute('class','noBlur'); 
}

const unFocus = (event) =>{
    event.target.setAttribute('class','blur'); 
}

const redirect = () =>{
    window.location.href = "https://www.google.com/maps";
}

locationImages.forEach((val)=>{
    val.setAttribute('class','blur'); 
    val.addEventListener('mouseenter',()=>focus(event))
    val.addEventListener('mouseleave',()=>unFocus(event))
    val.addEventListener('dblclick',()=>redirect(event)); 
})


document.addEventListener('scroll', ()=> {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    let icon = document.querySelector('#cheeze-path');
    icon.setAttribute('fill',`#${randomColor}`)
});
document.addEventListener('keydown',()=>removeModal(event))
contactLink.addEventListener('click',openModel);
// create and add modal to the html, set display : block, id : modal 
// save a pointer to this modal for later use. 
const alertCallback = () =>{
    alert('A change has been made to the DOM!')
}
const observer = new MutationObserver(alertCallback); 
observer.observe(document.querySelector('#container'),config)