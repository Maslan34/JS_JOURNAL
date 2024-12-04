import React from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  notification,
  Select,
} from "antd";
import dayjs from "dayjs";
import { GET_ALL_USERS, NEW_EVENT_MUTUATION, GET_EVENTS } from "./quaries";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;

function NewForm() {
  const navigate = useNavigate();

  const [saveEvent, { loading, error, data }] = useMutation(
    NEW_EVENT_MUTUATION,
    {
      update(cache, { data: { addEvent } }) {
        try {
          // FETCHING CURRENT EVENT DATA FROM CACHE
          const { getAllEvents } = cache.readQuery({ query: GET_EVENTS });

          // ADDING THE NEWLY ADDED EVENT TO THE CURRENT EVENTS LIST
          cache.writeQuery({
            query: GET_EVENTS,
            data: {
              getAllEvents: [addEvent, ...getAllEvents],
            },
          });
        } catch (err) {
          console.error("Cache update failed", err);
        }
      },
    }
  );

  const {
    loading: get_users_loading,
    error: get_users_error,
    data: users,
  } = useQuery(GET_ALL_USERS);
  //console.log("Loading durumu:")
  //console.log(loading);
  console.log("Gelen Kullanıcı Verileri");
  console.log(users);

  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);

      // EXECUTING MUTATION
      const { data } = await saveEvent({
        variables: {
          title: values.title,
          desc: values.description,
          date: values.dateRange
            ? values.dateRange[0].format("YYYY-MM-DD")
            : "",
          from: values.startTime.format("HH:mm"),
          to: values.endTime.format("HH:mm"),
          locationId: parseInt(values.locationId),
          userId: parseInt(values.userId),
        },
      });

      console.log("MUTATION RESULT:", data);

      // Başarılı bir şekilde mutasyon yapıldıysa, notification göster
      notification.success({
        message: "You are being redirected to home in 5 seconds",
        description: "New Event Created Successfully.",
        placement: "top",
        duration: 5,
      });

      // REDIRECT AFTER 5 SECONDS
      setTimeout(() => {
        navigate("/"); // USING useNavigate FOR REDIRECTION
      }, 5000);
    } catch (err) {
      console.error("Event creation failed", err);
      notification.error({
        message: "Submission Failed",
        description: "An error occurred while creating the event.",
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
      <Form
        name="eventForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          disabled={loading}
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: "Please select a date range!" }]}
        >
          <RangePicker picker="year" />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select the start time!" }]}
        >
          <TimePicker defaultValue={dayjs("12:08", "HH:mm")} format="HH:mm" />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select the end time!" }]}
        >
          <TimePicker defaultValue={dayjs("14:00", "HH:mm")} format="HH:mm" />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="Location ID"
          name="locationId"
          rules={[
            { required: true, message: "Please input your Location ID!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="User ID"
          name="userId"
          rules={[{ required: true, message: "Please input your User ID!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          disabled={loading}
          label="Choose an option"
          name="selection"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select
            loading={get_users_loading}
            disabled={get_users_loading}
            placeholder="Select a user"
            allowClear
          >
            {users &&
              users.getAllUsers.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.username}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item disabled={loading} wrapperCol={{ offset: 8, span: 16 }}>
          <Button disabled={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewForm;
