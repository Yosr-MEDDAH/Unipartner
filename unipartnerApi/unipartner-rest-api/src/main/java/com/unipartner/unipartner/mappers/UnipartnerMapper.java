package com.unipartner.unipartner.mappers;

import com.unipartner.unipartner.collections.*;
import com.unipartner.unipartner.dto.*;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
public class UnipartnerMapper {
    public UserDTO fromUser(User user){
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user,userDTO);
        return userDTO;
    }

    public User fromUserDTO(UserDTO userDTO){
        User user = new User();
        BeanUtils.copyProperties(userDTO,user);
        return user;
    }

    public SignalDTO fromSignal(Signal signal){
        SignalDTO signalDTO = new SignalDTO();
        BeanUtils.copyProperties(signal,signalDTO);
        return signalDTO;
    }

    public Signal fromSignalDTO(SignalDTO signalDTO){
        Signal signal = new Signal();
        BeanUtils.copyProperties(signalDTO,signal);
        return signal;
    }

    public LikeDTO fromLike(Like like){
        LikeDTO likeDTO = new LikeDTO();
        BeanUtils.copyProperties(like,likeDTO);
        return likeDTO;
    }
    public Like fromLikeDTO(LikeDTO likeDTO){
        Like like = new Like();
        BeanUtils.copyProperties(likeDTO,like);
        return like;
    }

    public MatchDTO fromMatch(Match match){
        MatchDTO matchDTO = new MatchDTO();
        BeanUtils.copyProperties(match,matchDTO);
        return matchDTO;
    }
    public Match fromMatchDTO(MatchDTO matchDTO){
        Match match = new Match();
        BeanUtils.copyProperties(matchDTO,match);
        return match;
    }
    public MessageDTO fromMessage(Message message){
        MessageDTO messageDTO = new MessageDTO();
        BeanUtils.copyProperties(message,messageDTO);
        return messageDTO;
    }
    public Message fromMessageDTO(MessageDTO messageDTO){
        Message message = new Message();
        BeanUtils.copyProperties(messageDTO,message);
        return message;
    }
    public ConversationDTO fromConversation(Conversation conversation){
        ConversationDTO conversationDTO = new ConversationDTO();
        BeanUtils.copyProperties(conversation,conversationDTO);
        return conversationDTO;
    }

    public Conversation fromConversationDTO(ConversationDTO conversationDTO){
        Conversation conversation = new Conversation();
        BeanUtils.copyProperties(conversationDTO,conversation);
        return conversation;
    }
}