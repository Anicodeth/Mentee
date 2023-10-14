// import Pusher from "pusher-js";
//
// const pusherKey = "20d590a2a5e4500caac1";
// const pusherCluster = "ap2";
// var pusher;
//
// // initialize pusher with your app key and cluster
// function initializePusher(){
//      pusher = new Pusher(pusherKey, {
//         cluster: pusherCluster,
//     });
// }
//
// // subscribe to your channel which is the same as your room
// function subscribeToChannel(roomId){
//     return pusher.subscribe(roomId);
// }
//
// // remove student from the list when disconnected
// function removeStudent(studentId,channel){
// channel.bind("user-disconnected", (userInfo) => {
//     const { studentId } = userInfo;
//     removeStudent(studentId);
// });}
//
// // handle when a new message is sent to the chat room
// myRoom.bind("chat-message", (message) => {
//     if (message.sender === userInfo.name) {
//         const date = new Date();
//         message.status =
//             (date.getHours() % 12).toString() +
//             ":" +
//             (date.getMinutes() < 10 ? "0" : "") +
//             date.getMinutes().toString() +
//             (date.getHours() > 11 ? " PM" : " AM");
//
//         setMessages((prevMessages) => {
//             let res = prevMessages.slice(0, prevMessages.length - 1);
//             res.push(message);
//             return res;
//         });
//     } else {
//         const date = new Date();
//         message.status =
//             (date.getHours() % 12).toString() +
//             ":" +
//             (date.getMinutes() < 10 ? "0" : "") +
//             date.getMinutes().toString() +
//             (date.getHours() > 11 ? " PM" : " AM");
//
//         setMessages((prevMessages) => [...prevMessages, message]);
//     }
// });