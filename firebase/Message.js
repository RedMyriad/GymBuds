import firebaseApp from './firebaseConfig';
import moment from 'moment';

export const SendMessage = async (currentUserId, guestUserId, msgValue) => {
    console.log("about to send message")
    var todayDate=moment();
    try {
        return await firebaseApp.
            database().
            ref('messages/' + guestUserId)
            .child(currentUserId).
            push({
                messege: {
                    sender: currentUserId,
                    reciever: guestUserId,
                    msg: msgValue,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A')
                },
            })
    } catch (error) {
        return error;
    }
}


export const GetAllUserMessages = async (currentUserId) => {
    try {
        console.log("getting all messages")
        await firebaseApp.
            database().
            ref('messages/' + currentUserId).once("value").then ( messages =>{
                messages.forEach(record=>{
                    console.log(record.val())
                })
            })
    } catch (error) {
        return error;
    }
}