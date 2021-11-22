import { Component } from "react";
import { Comment, Avatar, Row, Col } from 'antd';
import { Message } from "../models/message.model";
import { User } from "../models/user.model";

export class MesageList extends Component {
    props: { user: User, messages: Message[] };

    constructor(props: { user: User, messages: Message[] }) {
        super(props);
        this.props = props;
    }

    componentDidUpdate(props: { user: User, messages: Message[] }) {
        if (this.props.messages !== props.messages) {
            this.setState({ user: props.user, messages: props.messages });
        }
    }

    render() {
        return (
            <Row>
                {this.props.messages.map((data, index) =>
                    <Col key={index} span={13} offset={this.props.user.name === data.author ? 0 : 16}>
                        <Comment
                            style={{ background: this.props.user.name === data.author ? '#e3f2fd' : 'none' }}
                            author={data.author}
                            avatar={<Avatar src={data.avatar} alt={data.author} />}
                            content={
                                <p>
                                    {data.message}
                                </p>
                            }
                        />
                    </Col>
                )}
            </Row>
        );
    }
}