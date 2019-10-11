import { auth, db } from "./firebaseConfige";

export function getdata() {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('wholeData').on('value', (snap) => {
                    console.log(snap.val())
                    dispatch({
                        type: "get",
                        payload: snap.val()
                    })
                })
            } else {
                console.log('else')
            }
        })
    }
}

function makingLength_2(value, miliseconds) {
    if (miliseconds === "miliseconds") {
        value = value.toString()
        let correctValue = value.length === 1 ? "00" + value : value.length === 2 ? "0" + value : value
        // console.log(correctValue)
        return correctValue

    } else {

        value = value.toString()
        let correctValue = value.length === 1 ? "0" + value : value
        // console.log(correctValue)
        return correctValue
    }
}

export function datefn() {
    let d = new Date()
    let year = d.getFullYear()
    let month = makingLength_2(d.getMonth() + 1)
    let date = makingLength_2(d.getDate())
    let hours = makingLength_2(d.getHours())
    let mintues = makingLength_2(d.getMinutes())
    let seconds = makingLength_2(d.getSeconds())
    let miliSeconds = makingLength_2(d.getMilliseconds(), "miliseconds")
    let entryNo = year.toString() + month.toString() + date.toString() + hours.toString() + mintues.toString() + seconds.toString() + miliSeconds.toString()
    // console.log(entryNo)
    return entryNo

}