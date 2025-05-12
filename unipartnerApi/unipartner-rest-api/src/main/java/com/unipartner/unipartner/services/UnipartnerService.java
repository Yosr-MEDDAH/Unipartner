package com.unipartner.unipartner.services;

import com.unipartner.unipartner.collections.Conversation;
import com.unipartner.unipartner.collections.Match;
import com.unipartner.unipartner.collections.Message;
import com.unipartner.unipartner.collections.User;
import com.unipartner.unipartner.dto.*;
import com.unipartner.unipartner.exceptions.SignalNotFoundException;
import com.unipartner.unipartner.exceptions.TargetUserNotFoundException;

import java.util.List;

public interface UnipartnerService {
    UserDTO updateUser(UserDTO userDTO);
    List<UserDTO> findAllUsers();
    void deleteUser(String userId);
    List<UserDTO> searchUsers(String keyword);
    SignalDTO saveSignal(SignalDTO signalDTO, String userId) throws TargetUserNotFoundException;
    SignalDTO updateSignal(SignalDTO signalDTO, String userId) throws SignalNotFoundException;
    List<SignalDTO> getSignalsByUserId(String userId);
    SignalDTO getSignal(String signalId);
    void deleteSignal(String signalId);
    UserDTO getUserById(String id);
    List<String> getRecommendations(String userId);
    List<UserDTO> findAllByTheirIds();
    LikeDTO likeUser(String toUserId);
    Match createMatch(User user1, User user2);
    List<MatchDTO> getAllMatches();
    MessageDTO addMessage(MessageDTO messageDTO, String conversationId);
    List<MessageDTO> GetAllMessagesByConversation(String conversationId);
    ConversationDTO getConversationById(String id);
    List<ConversationDTO> getAllConversations();
    void deleteMessage(String id);
    ConversationDTO addConversation(User user1, User user2);
    void deleteConversation(String id);

}
