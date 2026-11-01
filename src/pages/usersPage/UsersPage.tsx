import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import { useNavigate } from "react-router";
import {
  deleteUser,
  getUsers,
  updateUserBlock,
  updateUserRoles,
} from "../../api/userApi";
import { useError } from "../../hooks/errorContext";
import type {
  Role,
  User,
  UsersOrderBy,
  UsersOrderDirection,
} from "../../types/user.types";

const PAGE_SIZE = 20;

type BlockFilter = "all" | "blocked" | "active";

const roleLabels: Record<Role, string> = {
  user: "Пользователь",
  admin: "Администратор",
  moderator: "Модератор",
  manager: "Менеджер",
};

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { showError } = useError();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [blockFilter, setBlockFilter] = useState<BlockFilter>("all");
  const [orderBy, setOrderBy] = useState<UsersOrderBy>("id");
  const [orderDir, setOrderDir] = useState<UsersOrderDirection>("desc");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const loadUsers = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getUsers({
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
        orderBy,
        orderDir,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(blockFilter === "all"
          ? {}
          : { isBlocked: blockFilter === "blocked" }),
      });
      setUsers(response.data);
      setTotal(response.total);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, [blockFilter, debouncedSearch, orderBy, orderDir, page, showError]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleAction = async (
    action: () => Promise<unknown>,
  ): Promise<void> => {
    setLoading(true);
    try {
      await action();
      await loadUsers();
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: User["id"]): Promise<void> => {
    setLoading(true);
    try {
      await deleteUser(userId);
      if (users.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        await loadUsers();
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Имя пользователя",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      sortOrder:
        orderBy === "userName"
          ? orderDir === "asc"
            ? "ascend"
            : "descend"
          : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder:
        orderBy === "email"
          ? orderDir === "asc"
            ? "ascend"
            : "descend"
          : null,
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) =>
        new Date(createdAt).toLocaleDateString("ru-RU"),
    },
    {
      title: "Статус",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? "red" : "green"}>
          {isBlocked ? "Заблокирован" : "Активен"}
        </Tag>
      ),
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Role[]) => (
        <Space wrap>
          {roles.map((role) => (
            <Tag key={role}>{roleLabels[role]}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phoneNumber?: string) => phoneNumber || "—",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_value, user) => {
        const isAdmin = user.roles.includes("admin");

        return (
          <Space wrap>
            <Button size="small" onClick={() => navigate(`/users/${user.id}`)}>
              Перейти к профилю
            </Button>
            <Popconfirm
              title={
                user.isBlocked
                  ? "Разблокировать пользователя?"
                  : "Заблокировать пользователя?"
              }
              onConfirm={() =>
                handleAction(() => updateUserBlock(user.id, !user.isBlocked))
              }
              okText="Да"
              cancelText="Нет"
            >
              <Button size="small">
                {user.isBlocked ? "Разблокировать" : "Заблокировать"}
              </Button>
            </Popconfirm>
            <Popconfirm
              title={
                isAdmin
                  ? "Забрать роль администратора?"
                  : "Дать роль администратора?"
              }
              onConfirm={() => {
                const roles = isAdmin
                  ? user.roles.filter((role) => role !== "admin")
                  : [...user.roles, "admin" as const];
                return handleAction(() => updateUserRoles(user.id, roles));
              }}
              okText="Да"
              cancelText="Нет"
            >
              <Button size="small">
                {isAdmin ? "Забрать роль админа" : "Дать роль админа"}
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Удалить пользователя?"
              onConfirm={() => handleDelete(user.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button size="small" danger>
                Удалить
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleTableChange: TableProps<User>["onChange"] = (
    pagination,
    _filters,
    sorter,
    extra,
  ) => {
    if (extra.action === "paginate") {
      setPage(pagination.current ?? 1);
      return;
    }

    if (Array.isArray(sorter) || !sorter.order) {
      setOrderBy("id");
      setOrderDir("desc");
    } else if (sorter.field === "userName" || sorter.field === "email") {
      setOrderBy(sorter.field);
      setOrderDir(sorter.order === "ascend" ? "asc" : "desc");
    }
    setPage(1);
  };

  const visibleUsers = users.filter((user) => {
    if (blockFilter === "blocked") return user.isBlocked;
    if (blockFilter === "active") return !user.isBlocked;
    return true;
  });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%", padding: 24 }}>
        <Typography.Title level={2}>Пользователи</Typography.Title>
        <Space wrap style={{ marginBottom: 16 }}>
          <Input
            allowClear
            placeholder="Поиск по имени или email"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            style={{ width: 300 }}
          />
          <Select<BlockFilter>
            value={blockFilter}
            onChange={(value) => {
              setBlockFilter(value);
              setPage(1);
            }}
            style={{ width: 220 }}
            options={[
              { value: "all", label: "Все пользователи" },
              { value: "blocked", label: "Заблокированные" },
              { value: "active", label: "Активные" },
            ]}
          />
        </Space>
        <Table<User>
          style={{ width: "100%" }}
          rowKey="id"
          columns={columns}
          dataSource={visibleUsers}
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total,
            showSizeChanger: false,
          }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
};
