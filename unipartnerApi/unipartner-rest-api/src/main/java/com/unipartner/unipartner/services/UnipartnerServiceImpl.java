package com.unipartner.unipartner.services;

import com.unipartner.unipartner.collections.*;
import com.unipartner.unipartner.dto.*;
import com.unipartner.unipartner.exceptions.SignalNotFoundException;
import com.unipartner.unipartner.exceptions.TargetUserNotFoundException;
import com.unipartner.unipartner.mappers.UnipartnerMapper;
import com.unipartner.unipartner.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLOutput;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UnipartnerServiceImpl implements UnipartnerService{
    private final UserRepository userRepository;
    private final SignalRepository signalRepository;
    private final UnipartnerMapper dtoMapper;
    private final RestTemplate restTemplate;
    private final LikeRepository likeRepository;
    private final MatchRepository matchRepository;
    private final MessageRepositorie messageRepositorie;
    private final ConversationRepositorie conversationRepositorie;
    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        User user = dtoMapper.fromUserDTO(userDTO);
        User savedUser = userRepository.save(user);
        return dtoMapper.fromUser(savedUser);
    }


    @Override
    public List<UserDTO> findAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = users.stream()
                .map(user->dtoMapper.fromUser(user))
                .collect(Collectors.toList());
        return userDTOS;
    }

    @Override
    public List<ConversationDTO> getAllConversations() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);
        List<Conversation> conversations = conversationRepositorie.findAllByUser1IsOrUser2Is(authenticatedUser,authenticatedUser);
        List<ConversationDTO> conversationDTOS= conversations.stream()
                .map(conversation -> dtoMapper.fromConversation(conversation))
                .collect(Collectors.toList());
        return conversationDTOS;
    }

    @Override
    public List<MatchDTO> getAllMatches() {
        List<Match> matches = matchRepository.findAll();
        List<MatchDTO> matchDTOS = matches.stream()
                .map(match->dtoMapper.fromMatch(match))
                .collect(Collectors.toList());
        return matchDTOS;
    }

    @Override
    public List<MessageDTO> GetAllMessagesByConversation(String conversationId) {
        Conversation conversation = conversationRepositorie.findById(conversationId).get();
        List<Message> messages = conversation.getMessages();
        List<MessageDTO> messageDTOS = messages.stream()
                .map(message -> dtoMapper.fromMessage(message))
                .collect(Collectors.toList());
        return messageDTOS;
    }







    @Override
    public void deleteMessage(String id) {

    }



    @Override
    public void deleteConversation(String id) {

    }

    @Override
    public List<SignalDTO> getSignalsByUserId(String userId) {
        UserDTO userDTO = getUserById(userId);
        User user = dtoMapper.fromUserDTO(userDTO);
        List<Signal>signals = user.getSignals();
        List<SignalDTO> signalDTOS = signals.stream()
                .map(signal -> dtoMapper.fromSignal(signal))
                .collect(Collectors.toList());
        return signalDTOS;
    }


    @Override
    public List<UserDTO> findAllByTheirIds() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);
        List<String> recommendations = getRecommendations(authenticatedUser.getId());
        List<User> users = userRepository.findAllByIdIn(recommendations);
        // Remove the authenticated user
        users.removeIf(user -> user.getId().equals(authenticatedUser.getId()));

        // Re-sort users based on the order of recommendations
        users.sort(Comparator.comparingInt(user -> recommendations.indexOf(user.getId())));

        // Convert to DTOs
        List<UserDTO> userDTOS = users.stream()
                .map(user -> dtoMapper.fromUser(user))
                .collect(Collectors.toList());

        return userDTOS;
    }

    @Override
    public LikeDTO likeUser(String toUserId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);
        User toUser = userRepository.findUserById(toUserId);

        if(authenticatedUser != null && toUser != null){
            if (!isMatchExists(authenticatedUser, toUser)) {
            Like like = new Like();
            like.setFromUser(authenticatedUser);
            like.setToUser(toUser);
            like.setLikedAt(new Date());
            toUser.getLikesReceived().add(like);
            likeRepository.save(like);
            userRepository.save(toUser);
            if(likeRepository.existsByFromUserAndToUser(toUser,authenticatedUser)){
                Match match = createMatch(authenticatedUser,toUser);
                ConversationDTO conversationDTO = new ConversationDTO();
                conversationDTO = this.addConversation(authenticatedUser,toUser);
            }

            return dtoMapper.fromLike(like);
            }
        }
        return null;
    }

    @Override
    public Match createMatch(User user1, User user2) {
        Match match = new Match();
        match.setUser1(user1);
        match.setUser2(user2);
        match.setCreatedAt(new Date());
        matchRepository.save(match);

        user1.addMatch(match);
        user2.addMatch(match);
        userRepository.saveAll(List.of(user1, user2));
        return match;
    }

    public boolean isMatchExists(User user1, User user2) {
        return matchRepository.existsByUser1AndUser2(user1, user2);
    }


    @Override
    public ConversationDTO addConversation(User user1, User user2) {
        Conversation conversation = new Conversation();
        conversation.setCreatedAt(new Date());
        conversation.setUser1(user1);
        conversation.setUser2(user2);
        conversation.setMessages(new ArrayList<Message>());
        Conversation savedConversation = conversationRepositorie.save(conversation);
        return dtoMapper.fromConversation(savedConversation);
    }


    @Override
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public List<UserDTO> searchUsers(String keyword) {
        return null;
    }

//    @Override
//    public SignalDTO saveSignal(SignalDTO signalDTO, String userId) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User authenticatedUser =userRepository.findFirstByEmail(authentication.getName()) .get();
//        User targetUser = userRepository.findById(userId).get();
//
//        Signal signal = dtoMapper.fromSignalDTO(signalDTO);
//        signal.setReportedAt(new Date());
//        signal.setReportedBy(authenticatedUser);
//        targetUser.getSignals().add(signal);
//        Signal savedSignal1 = signalRepository.save(signal);
//        userRepository.save(targetUser);
//        return dtoMapper.fromSignal(savedSignal1);
//    }

    @Override
    public SignalDTO saveSignal(SignalDTO signalDTO, String userId) throws TargetUserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);

        if (authenticatedUser == null) {
            throw new RuntimeException("Authenticated user not found.");
        }

        User targetUser = userRepository.findById(userId)
                .orElseThrow(() -> new TargetUserNotFoundException("Target user not found"));

        Signal signal = dtoMapper.fromSignalDTO(signalDTO);
        signal.setReportedAt(new Date());
        signal.setReportedBy(authenticatedUser);

        targetUser.getSignals().add(signal);

        Signal savedSignal = signalRepository.save(signal);
        userRepository.save(targetUser);

        return dtoMapper.fromSignal(savedSignal);
    }

    @Override
    public MessageDTO addMessage(MessageDTO messageDTO, String idConversation) {
        Message message = dtoMapper.fromMessageDTO(messageDTO);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).orElse(null);
        Conversation conversation = conversationRepositorie.findById(idConversation).get();
        System.out.println(conversation.getUser2().getEmail());
        System.out.println(conversation.getUser1().getEmail());
        if(conversation.getUser1().getEmail().equals(authenticatedUser.getEmail())) {
            message.setToUser(conversation.getUser2());
        } else if (conversation.getUser2().getEmail().equals(authenticatedUser.getEmail())) {
            message.setToUser(conversation.getUser1());
        }
        message.setFromUser(authenticatedUser);
        message.setCreatedAt(new Date());

        Message savedMessage = messageRepositorie.save(message);
        conversation.getMessages().add(savedMessage);
        conversationRepositorie.save(conversation);
        return dtoMapper.fromMessage(savedMessage);
    }


    @Override
    public SignalDTO updateSignal(SignalDTO updatedSignalDTO, String signalId) throws SignalNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findFirstByEmail(authentication.getName()).get();

        Signal existingSignal = signalRepository.findById(signalId).orElse(null);

        if (existingSignal == null) {
            throw new SignalNotFoundException("Signal not found");
        }

        existingSignal.setTypeSignal(updatedSignalDTO.getTypeSignal());

        existingSignal.setReportedAt(new Date());
        existingSignal.setReportedBy(authenticatedUser);

        Signal savedSignal = signalRepository.save(existingSignal);
        return dtoMapper.fromSignal(savedSignal);
    }



    @Override
    public SignalDTO getSignal(String signalId) {
        Signal signal = signalRepository.findById(signalId).get();
        return dtoMapper.fromSignal(signal);
    }

    @Override
    public ConversationDTO getConversationById(String id) {
        Conversation conversation = conversationRepositorie.findById(id).get();
        return dtoMapper.fromConversation(conversation);
    }


    @Override
    public void deleteSignal(String signalId) {
        signalRepository.deleteById(signalId);
    }

        @Override
        public UserDTO getUserById(String id) {
            User user = userRepository.findUserById(id);
            return dtoMapper.fromUser(user);
        }

//        @Override
//        public List<String> getRecommendations(String userId) {
//            UserDTO userDTO = getUserById(userId);
//
//            String flaskServiceUrl = "http://localhost:5000/recommend";
//            Object requestData = prepareRequestData(userDTO);
//
//            List<String> recommendations = restTemplate.postForObject(flaskServiceUrl, requestData, List.class);
//
//
//            return recommendations;
//        }
@Override
public List<String> getRecommendations(String userId) {
    UserDTO userDTO = getUserById(userId);

    String flaskServiceUrl = "http://localhost:5000/recommend";
    Object requestData = prepareRequestData(userDTO);

    // Use a parameterized type for the ResponseEntity to specify the expected type
    ResponseEntity<Map<String, List<String>>> responseEntity = restTemplate.exchange(
            flaskServiceUrl,
            HttpMethod.POST,
            new HttpEntity<>(requestData),
            new ParameterizedTypeReference<Map<String, List<String>>>() {});

    // Extract the list of recommended students from the response entity
    List<String> recommendations = responseEntity.getBody().get("recommended_students");
    for (String elt:recommendations){
        System.out.println("Id : "+elt.toString());
    }

    return recommendations;
}



    private Object prepareRequestData(UserDTO userDTO) {
            Map<String, Object> requestData = new HashMap<>();
            requestData.put("student_id", userDTO.getId());
            return requestData;
        }
}
