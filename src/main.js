// import "./css/index.css"
// import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function SetCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    americanexpress: ["black", "black"],
    maestro: ["#EB0A0A", "#3D99CC"],
    default: ["black", "gray"],
  }


ccBgColor01.setAttribute("fill", colors[type][0])
ccBgColor02.setAttribute("fill", colors[type][1])
ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.SetCardType = SetCardType

const securityCode = document.querySelector("#security-code")
const secutityCodePattern = {
  mask: "0000", 
}
const numbersOfSecurityCode = IMask(securityCode, secutityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
    
    MM: { 
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "americanexpress",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
      cardtype: "maestro",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g,"");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
    return number.match(item.regex)
    })
    console.log(foundMask)

    return foundMask
}
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addCardButton = document.querySelector("#add-card")
addCardButton.addEventListener("click", () => {
  alert("Cartão adicionado!")
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
  cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

numbersOfSecurityCode.on("accept", () => {
  updateSecurityCode(numbersOfSecurityCode.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")

  ccSecurity.innerText = code.length === 0 ? "123" : code
}


expirationDateMasked.on("accept", () => {
    updateExpirationDate(expirationDate.value)
})

function updateExpirationDate(code){
  const ccExpiration = document.querySelector(".cc-expiration .value")

  ccExpiration.innerText = code.length === 0 ? "02/32" : code

}

cardNumberMasked.on("accept", () => {
  const cardtype = cardNumberMasked.masked.currentMask.cardtype
  updatecardNumberMasked(cardNumberMasked.value)
  SetCardType(cardtype)
})

function updatecardNumberMasked(code){
  const ccNumber = document.querySelector(".cc-info .cc-number")

  ccNumber.innerText = code.length === 0 ? "1234 5678 9012 3456" : code
}

