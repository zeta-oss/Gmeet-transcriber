
export const detect_tab=()=>{
    const patmeeturl="https://meet.google.com/";
    chrome.tabs.query({active: true, lastFocusedWindow: true},((tabs)=>{
        console.log(tabs[0].url);
    },(err)=>{
        console.log(err);
    }));
};