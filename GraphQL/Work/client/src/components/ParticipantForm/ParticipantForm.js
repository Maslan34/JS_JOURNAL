import {React} from "react";
import { Button, Form, Input,  Divider,notification} from "antd";
import { NEW_PARTICIPANT_MUTATION } from "./quaries";
import {  useMutation, } from "@apollo/client";
import { useParams } from "react-router-dom";


function ParticipantForm() {
  const { id } = useParams();

  const [saveParticipant,{loading,error,data}] = useMutation(NEW_PARTICIPANT_MUTATION);

  const onFinish = async (values) => {

    try {
      //console.log("Form values:", values);

      const { data } = await saveParticipant({
        variables: {
          username: values.username,
          email: values.email,
          event_id:Number(id)
        },
      });

      console.log("Mutasyon sonucu:", data);

      // SHOW NOTIFICATION IF MUTATION IS SUCCESSFUL
    
      notification.success({
        message: "Participant Added",
        description: "Participant Added Succesfully.",
        placement: "top",
      });
    } catch (err) {
      console.error("Event creation failed", err);
      notification.error({
        message: "Submission Failed",
        description: "An error occurred while adding participant.",
        placement: "top",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form submission failed:", errorInfo);
    notification.error({
      message: "Submission Failed",
      description: "Please check the form for errors.",
      placement: "top",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Divider style={{ borderColor: "#7cb305" }}>Add New Participant</Divider>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={onFinish}
        //onValuesChange={onFormLayoutChange}
        //size={componentSize}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="username" required="true" label="Username">
          <Input placeholder="Enter username" />
        </Form.Item>

        <Button  type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ParticipantForm;
