import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';


export default function notificationCustom(title, message, type) {
    return store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        // animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
        touchSlidingExit: {
            swipe: {
                duration: 400,
                timingFunction: 'ease-out',
                delay: 0,
            },
            fade: {
                duration: 400,
                timingFunction: 'ease-out',
                delay: 0
            }
        },
        isMobile: true,

    });
}
