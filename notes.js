//to add the new note
const addbtn=document.querySelector("#btn");
const updateLS=()=>{
    const notes=document.querySelectorAll("textarea");
    const dates=document.querySelectorAll(".date")
    const noteD=[];
    const dateArr=[];
    notes.forEach((element) => {
        return noteD.push(element.value);
    });
    dates.forEach((element)=>{
        return dateArr.push(element.textContent);
    });
    localStorage.setItem('note',JSON.stringify(noteD));
    localStorage.setItem('date',JSON.stringify(dateArr));
}
const addNewNote=(text='',date='')=>{
    const note=document.createElement('div');
    note.classList.add('note');
    const innerHtm=`<div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="date hide"></div>
<div class="main ${text?"":"hide"}" ></div>
<textarea  id="text"></textarea>`
    note.insertAdjacentHTML("afterbegin",innerHtm);
    ///deleting a node
    const delbtn=note.querySelector(".delete");
delbtn.addEventListener("click",()=>{
    note.remove();
    updateLS();
});
          
   //referencees
    const editbtn=note.querySelector(".edit");
    const main=note.querySelector(".main");
    const TextA=note.querySelector('textarea');
    //if data present in text
    if(text){
    TextA.value=text;
    main.innerHTML=text;
    TextA.classList.add("hide");
    }
    
    //edit toggle
    TextA.addEventListener("keypress",(event)=>{
        if(event.key==="Enter"){
            let dateV=new Date().toLocaleString();
            const dateAdd= note.querySelector(".date");
            dateAdd.classList.remove("hide");
            dateAdd.innerHTML=dateV;
            const value=event.target.value;
            main.innerHTML=value;
            TextA.classList.add("hide");
            main.classList.remove("hide");

        }
        updateLS();
        
    });
    
    editbtn.addEventListener("click",()=>{
            TextA.classList.remove("hide");
            main.classList.add("hide");
    });

    document.body.appendChild(note);
};
const noteBack=JSON.parse(localStorage.getItem('note'));
const dateBack=JSON.parse(localStorage.getItem('date'));
if(noteBack){
    i=0;
    const n=Object.keys(dateBack).length;
    while(i<n){
        console.log(noteBack[i],dateBack[i]);
        addNewNote(noteBack[i],dateBack[i]);
        i++;
    }

}

addbtn.addEventListener("click",()=>addNewNote());





