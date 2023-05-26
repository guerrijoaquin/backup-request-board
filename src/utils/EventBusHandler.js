import { Manager } from "socket.io-client";
import { customNotif } from "./simplifiedNotifications";

export const EventBusHandler = (handler, currentUserId) => {

    const manager = new Manager('localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/');

    socket.on('new-card', handleNewCard)
    socket.on('move-card', handleMoveCard)
    socket.on('update-card', handleUpdateCard)
    socket.on('delete-card', handleDeleteCard)



    function handleNewCard(card){
        
        if (card.user.id === currentUserId) return;

        handler.publish({
            type: 'ADD_CARD',
            laneId: card.lane.id,
            card
        })

        const message = `${card.user.username} agregó una petición en ${card.lane.title}.`
        customNotif('show', message)
          
    }

    function handleMoveCard(moved){

        if (moved.userId === currentUserId) return;

        handler.publish({
            type: 'MOVE_CARD',
            fromLaneId: moved.fromId,
            toLaneId: moved.toId,
            cardId: moved.cardId,
            index: 0
        })
        
        const message = `${moved.username} movió una petición de ${moved.from} a ${moved.to}.`
        customNotif('show', message)

    }
    
    function handleUpdateCard(card){
        
        if (card.user.id === currentUserId) return;

        handler.publish({
            type: 'UPDATE_CARD',
            laneId: card.lane.id,
            card
        })

        const message = `${card.user.username} modificó una petición.`
        customNotif('show', message)
          
    }
      
    
    function handleDeleteCard({laneId, cardId, username, userId}){

        if (userId === currentUserId) return;

        
        handler.publish({
            type: 'REMOVE_CARD',
            laneId,
            cardId
        })

        const message = `${username} eliminó una petición.`
        customNotif('show', message)
          
    }
    
};