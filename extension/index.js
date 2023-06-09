
const detect_tab=()=>{
    const patmeeturl="https://meet.google.com/";
        chrome.tabs.query({'active': true}, tabs => {
          tabs.forEach(tab => {
            console.log(tab);
            if(tab.active)
            console.log(tab);
          });
        });
};

const transcribe=()=>{
    detect_tab();
};

window.onload=()=>{document.getElementById("tab1").addEventListener("click",transcribe);}