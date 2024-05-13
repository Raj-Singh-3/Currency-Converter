let drop = document.querySelectorAll(".list");
let btn = document.querySelector("#btn");
let amt = document.querySelector("#amt");
let msg = document.querySelector("#msg");

for(let a of drop)
{
    for(let code in countryList)
    {
        let b = document.createElement("option");
        b.value = code;
        b.innerText = code;
        if(a.name === "From" && b.value === "INR")
        {
            b.selected = "selected";
        }
        if(a.name === "To" && b.value === "USD")
        {
            b.selected = "selected";
        }
        a.append(b);
    }
    if(a.name === "From")
    {
        a.addEventListener("change",(e)=>{
            changeFlag(e.target,"From");
        });
    }
    else
    {
        a.addEventListener("change",(e)=>{
            changeFlag(e.target,"To");
        });
    }
}

function changeFlag(e,l)
{
    let country = e.value;
    let cCode  = countryList[country];
    let newSrc = `https://flagsapi.com/${cCode}/flat/64.png`;
    let img;
    if(l == "From")
    {
        img = document.querySelector("#img1");
    }
    else
    {
        img = document.querySelector("#img2");
    }
    img.src = newSrc;
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async()=>{
    msg.innerText="Please wait";
    msg.style.color="yellow";
    let amtVal = amt.value;
    if(amtVal === "" || amtVal<1)
    {
        amtVal = 1;
    }
    let c1;
    let c2;
    for(let a of drop)
    {
        if(a.name ==="From")
        {
            c1 = a.value;
        }
        else
        {
            c2 = a.value;
        }
    }
    let amt1 = parseInt(amt.value);
    console.log(amt1);
    let total_amt;

    // API Code starts here

    var myHeaders = new Headers();
    myHeaders.append("apikey", "ds0SkMmYSIVqFbC10L77re5oE65ZbqcB");

    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${c2}&from=${c1}&amount=${amt1}`, requestOptions)
    .then(response => response.json())
    .then(r => {
        total_amt = r.result;
        msg.innerText = `${amt1} ${c1} = ${total_amt} ${c2}`
        msg.style.color="purple";

    })
    .catch(error => console.log('error', error))
    //Api Code Ends here
}
