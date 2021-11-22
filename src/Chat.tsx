import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Input, Card } from "antd";
import { useEffect, useState } from "react";
import { MesageList } from "./components/message-list";
import { Message } from "./models/message.model";
import { User } from "./models/user.model";

export const Chat = () => {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<User>();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);


  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7246/hub/chat")
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (data) =>
            setMessages(messages => [...messages, new Message(data.author, data.message, data.avatar)])
          );
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const sendMessage = async () => {
    if (connection) {
      if (inputMessage !== "") {
        let message = new Message(userData?.name ?? '', inputMessage, userData?.avatar ?? '');
        await connection
          .invoke("UserWrite", message)
          .catch(error => console.log(error));
      }
      setInputMessage('');
    }
  };

  const configureUser = async () => {
    if (userName !== "") {
      if (connection) {
        const avatar = getAvatar();
        await connection
          .invoke("UserConnected", new Message(userName, '', avatar))
          .catch((error) => console.log(error));

        setUserData(new User(userName, avatar));
      }
    }
  };

  const getAvatar = () => {
    const avatars = [
      "//joeschmoe.io/api/v1/jon",
      "//joeschmoe.io/api/v1/jean",
      "//joeschmoe.io/api/v1/joe",
      "//joeschmoe.io/api/v1/jed",
      "//joeschmoe.io/api/v1/jeane",
      "//joeschmoe.io/api/v1/jordan",
      "//joeschmoe.io/api/v1/jack"
    ];
    return avatars[Math.round(Math.random() * (avatars.length - 0) + 0)];
  }

  if (!userData)
    return (
      <Card>
        <h1>Enter your name: </h1>
        <Input
          value={userName}
          onChange={(input) => {
            setUserName(input.target.value);
          }}
        />
        <br /><br />
        <Button onClick={configureUser} type="primary">
          Save
        </Button>
      </Card>
    );

  return (
    <>
      <MesageList {...{ user: userData, messages: messages }}></MesageList>
      <Card>
        <Input
          value={inputMessage}
          placeholder='write your message'
          onChange={(input) => setInputMessage(input.target.value)}
        />
        <br /><br />
        <Button onClick={sendMessage} type="primary">
          Send
        </Button>
      </Card>
    </>
  );
};