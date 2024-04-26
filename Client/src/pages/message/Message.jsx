import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";
import upload from "../../utils/upload";

const Message = () => {
  
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [file, setFile] = useState(null); // Moved useState inside the Message component
  const [conversation, setConversation] = useState(null); // Added useState for conversation

  const handleFileChange = (e) => { // Moved handleFileChange inside the Message component
    setFile(e.target.files[0]);
    debugger;
  };

  const queryClient = useQueryClient();

  const { isLoadingConv, convError } = useQuery({
    queryKey: ["conversation"],
    queryFn: () =>
      newRequest.get(`/conversations/single/${id}`).then((res) => {        
          setConversation(res.data);
      }),
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      })
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageData = {
      conversationId: id,
      desc: e.target[0].value,
    };
  
    if (file) {
      const resourceType = 'auto'; // Set resource type to 'auto'
      const fileUrl = await upload(file, resourceType);
      messageData.fileUrl = fileUrl; // Add file URL to message data
    }
  
    mutation.mutate(messageData);
    e.target[0].value = "";
    setFile(null);
  };

  const getMessageUserImage = (messageUserId) => {   
    if(messageUserId === currentUser._id) return currentUser.img;
    if(conversation.buyer._id === messageUserId) return conversation.buyer.img;
    return conversation.seller.img;
  }

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> / Conversation
        </span>
        <br/> <br/>
        {isLoading || !conversation ? (
          <h3>...loading</h3>
        ) : error || convError? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
               
                <img
                  src={getMessageUserImage(m.userId)}
                  alt=""
                />
                <p>{m.desc} {m.fileUrl && <a href={m.fileUrl} target="_blank" rel="noopener noreferrer">{m.fileUrl.split('/').pop()}</a>}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
