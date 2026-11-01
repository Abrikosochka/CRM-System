import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Form, Input, Result, Space } from "antd";
import type { FormProps } from "antd";
import { useNavigate, useParams } from "react-router";
import { getUser, updateUser } from "../../api/userApi";
import { useError } from "../../hooks/errorContext";
import { PhoneInput } from "../../shared/ui/phoneInput/PhoneInput";
import type { UpdateUserRequest, User } from "../../types/user.types";
import { LoadingSpinner } from "../../components/loadingSpinner/LoadingSpinner";

export const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showError } = useError();
  const [form] = Form.useForm<UpdateUserRequest>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const loadUser = useCallback(async (): Promise<void> => {
    const userId = Number(id);
    if (!Number.isInteger(userId)) {
      setLoadError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadError(false);
    try {
      const response = await getUser(userId);
      setUser(response);
      form.setFieldsValue({
        userName: response.userName,
        email: response.email,
        phoneNumber: response.phoneNumber ?? "",
        birthday: response.birthday,
      });
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [form, id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleSave: FormProps<UpdateUserRequest>["onFinish"] = async (
    values,
  ) => {
    if (!user) return;

    setSaving(true);
    try {
      const updatedUser = await updateUser(user.id, {
        userName: values.userName,
        email: values.email,
        phoneNumber: values.phoneNumber.replace(/[^\d+]/g, ""),
        ...(user.birthday ? { birthday: user.birthday } : {}),
      });
      setUser(updatedUser);
      form.setFieldsValue({
        userName: updatedUser.userName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber ?? "",
        birthday: updatedUser.birthday,
      });
      setEditing(false);
    } catch (error) {
      showError(error);
    } finally {
      setSaving(false);
    }
  };

  const cancelEditing = (): void => {
    if (!user) return;
    form.setFieldsValue({
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
      birthday: user.birthday,
    });
    setEditing(false);
  };

  if (loading) return <LoadingSpinner />;

  if (loadError || !user) {
    return (
      <Result
        status="error"
        title="Не удалось загрузить пользователя"
        extra={
          <Space>
            <Button type="primary" onClick={loadUser}>
              Повторить
            </Button>
            <Button onClick={() => navigate("/users")}>Вернуться</Button>
          </Space>
        }
      />
    );
  }

  return (
    <Card
      title="Профиль пользователя"
      style={{ width: "80%", maxWidth: 700, margin: "24px auto" }}
    >
      {editing ? (
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item<UpdateUserRequest>
            label="Имя пользователя"
            name="userName"
            rules={[
              { required: true, message: "Введите имя пользователя" },
              { max: 60, message: "Максимальная длина 60 символов" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UpdateUserRequest>
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Введите корректный email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<UpdateUserRequest>
            label="Номер телефона"
            name="phoneNumber"
            rules={[
              {
                validator(rule, value) {
                  void rule;
                  if (!value) return Promise.resolve();
                  return value.replace(/\D/g, "").length === 11
                    ? Promise.resolve()
                    : Promise.reject(new Error("Введите номер полностью"));
                },
              },
            ]}
          >
            <PhoneInput />
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={saving}>
              Сохранить
            </Button>
            <Button onClick={cancelEditing}>Отмена</Button>
          </Space>
        </Form>
      ) : (
        <>
          <Space direction="vertical">
            <p>Имя пользователя: {user.userName}</p>
            <p>Email: {user.email}</p>
            <p>Телефон: {user.phoneNumber || "—"}</p>
            <Space wrap>
              <Button type="primary" onClick={() => setEditing(true)}>
                Редактировать
              </Button>
              <Button onClick={() => navigate("/users")}>
                Вернуться к пользователям
              </Button>
            </Space>
          </Space>
        </>
      )}
    </Card>
  );
};
