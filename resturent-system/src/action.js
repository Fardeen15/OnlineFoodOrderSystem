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
            }else{
                console.log('else')
            }
        })
    }
}